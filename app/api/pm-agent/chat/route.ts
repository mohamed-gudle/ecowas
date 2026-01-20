import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { mockTeamData, Team } from "@/lib/pm-agent-mock-data"

export const runtime = "edge"

const PM_AGENT_SYSTEM_PROMPT = `You are an expert Project Management Assistant for the ECOWAS Secretariat. Your goal is to help team members stay organized, track progress, and facilitate communication.

## Your Capabilities:
1. **Context Awareness**: You have access to the team's recent emails, meeting recordings (summaries), and chat history.
2. **Task Management**: You can identify action items, blockers, and responsible parties.
3. **Drafting**: You can draft emails or chat messages based on the context.
4. **Synthesis**: You can summarize discussions and decisions from multiple sources.

## Interaction Guidelines:
- **Be Proactive**: If you see a blocker in the context, flag it.
- **Be Specific**: Quote specific emails or meetings when answering (e.g., "In the meeting on Jan 20...").
- **Be Concise**: Busy executives need quick answers.
- **Tone**: Professional, efficient, and helpful.

## current Context:
You will be provided with the latest emails, meetings, and chats for the specific team you are assisting. Use this information to answer the user's queries.
`

export async function POST(req: Request) {
    try {
        const { messages, team } = await req.json()
        const currentTeam = team as Team
        const context = mockTeamData[currentTeam]

        if (!context) {
            return new Response("Team context not found", { status: 404 })
        }

        // Build context string
        let contextString = `\n\n## Context for ${currentTeam} Team:\n`

        if (context.emails.length > 0) {
            contextString += `\n### Recent Emails:\n`
            context.emails.forEach(e => {
                contextString += `- **From**: ${e.from} | **Subject**: ${e.subject} | **Date**: ${e.date}\n  **Content**: "${e.content}"\n`
            })
        } else {
            contextString += `\n### Recent Emails: None\n`
        }

        if (context.meetings.length > 0) {
            contextString += `\n### Recent Meetings:\n`
            context.meetings.forEach(m => {
                contextString += `- **Title**: ${m.title} | **Date**: ${m.date}\n  **Summary**: "${m.summary}"\n  **Attendees**: ${m.attendees.join(", ")}\n`
            })
        } else {
            contextString += `\n### Recent Meetings: None\n`
        }

        if (context.chats.length > 0) {
            contextString += `\n### Recent Team Chat:\n`
            context.chats.forEach(c => {
                contextString += `- **${c.user}** (${c.timestamp}): "${c.content}"\n`
            })
        } else {
            contextString += `\n### Recent Team Chat: None\n`
        }

        const systemPrompt = PM_AGENT_SYSTEM_PROMPT + contextString

        const result = await streamText({
            model: openai("gpt-4o"),
            system: systemPrompt,
            messages,
            temperature: 0.7,
            maxOutputTokens: 2000,
        })

        return result.toTextStreamResponse()
    } catch (error) {
        console.error("PM Agent API Error:", error)
        return new Response(
            JSON.stringify({ error: "Failed to process request" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        )
    }
}
