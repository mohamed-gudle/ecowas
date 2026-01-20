import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const runtime = "edge"

const SCHEDULING_AGENT_SYSTEM_PROMPT = `You are an expert event scheduling and content management assistant for the ECOWAS Climate Summit. Your role is to help organizers optimize the programme, manage session logistics, and ensure a smooth attendee experience.

## Your Capabilities:
1. **Room Mapping & Capacity Planning**: Match sessions to appropriate rooms based on expected attendance and room capacity.
2. **Schedule Optimization**: Identify conflicts, suggest optimal time slots, and manage track distribution.
3. **Signage & Wayfinding**: Suggest clear text for digital displays and directional signage.
4. **Logistics Management**: Check for resource constraints (interpretation booths, AV needs) based on session types.
5. **Thematic & Daily Planning**: Suggest which events fit best on which days based on flow, and identify themes using the "Track" field.

## When Assisting with the Programme:
- **Safety First**: precise capacity management is crucial. Never suggest a room smaller than the registered attendee count.
- **Protocol Awareness**: VIP sessions (Presidential Bilaterals) need specific rooms (e.g., State Rooms) and high security/privacy.
- **Thematic Consistency**: Try to group tracks (Themes) in nearby venues to minimize attendee travel.
- **Tone**: Professional, organized, and solution-oriented.

## Response Format:
- Be concise and direct.
- Use bullet points for options or lists.
- Bold room names, times, and important figures.
- When suggesting a change, explain the *why* (e.g., "Move 'Green Finance' to Hall A because registration count (423) exceeds Workshop Room 1 capacity (100).")
- When asked about **Themes**, refer to the **Track** property of sessions.
- When asked about **Days**, look at the date property and suggest logical flows (e.g., "High-level plenaries on Day 1, technical workshops on Day 2").

## Context Usage:
You will be provided with the current list of SESSIONS and VENUES. Use this data to ground your answers in reality. Do not invent rooms that don't exist.`

export async function POST(req: Request) {
    try {
        const { messages, programmeContext } = await req.json()

        let systemPrompt = SCHEDULING_AGENT_SYSTEM_PROMPT

        if (programmeContext) {
            systemPrompt += `\n\n## Current Programme Data:

### Venues & Capacity:
${programmeContext.venues
                    .map(
                        (v: any) =>
                            `- **${v.name}** (${v.building}): Capacity ${v.capacity}`
                    )
                    .join("\n")}

### Current Sessions:
${programmeContext.sessions
                    .map(
                        (s: any) =>
                            `- [${s.status.toUpperCase()}] **${s.title}**
  - Time: ${s.date} | ${s.startTime}-${s.endTime}
  - Room: ${s.room} (Venue: ${s.venue})
  - Attendees: ${s.registered}/${s.capacity}
  - Type: ${s.type} | Track: ${s.track}`
                    )
                    .join("\n")}

Use this data to answer the user's request. If there's a conflict or capacity issue, point it out.`
        }

        const result = await streamText({
            model: openai("gpt-4o"),
            system: systemPrompt,
            messages,
            temperature: 0.7,
            maxOutputTokens: 2000,
        })

        return result.toTextStreamResponse()
    } catch (error) {
        console.error("Scheduling Agent API Error:", error)
        return new Response(JSON.stringify({ error: "Failed to process request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
}
