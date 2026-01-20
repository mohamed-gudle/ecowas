import { Project } from './types'

// Coordinates for West African countries/cities
const COORDS = {
    // Nigeria
    lagos: [6.5244, 3.3792] as [number, number],
    abuja: [9.0765, 7.3986] as [number, number],
    kano: [12.0022, 8.5919] as [number, number],
    calabar: [4.9757, 8.3417] as [number, number],
    taraba: [8.8918, 11.3669] as [number, number],
    // Ghana
    accra: [5.6037, -0.1870] as [number, number],
    kumasi: [6.6884, -1.6244] as [number, number],
    takoradi: [4.8845, -1.7554] as [number, number],
    ahafo: [7.0833, -2.3333] as [number, number],
    namdini: [10.6167, -0.8167] as [number, number],
    // Senegal
    dakar: [14.7167, -17.4677] as [number, number],
    sangomar: [13.8500, -17.1000] as [number, number],
    // Sierra Leone
    freetown: [8.4657, -13.2317] as [number, number],
    bo: [7.9644, -11.7383] as [number, number],
    kenema: [7.8767, -11.1875] as [number, number],
    lungi: [8.6167, -13.2000] as [number, number],
    // Liberia
    monrovia: [6.3156, -10.8074] as [number, number],
    buchanan: [5.8808, -10.0467] as [number, number],
    // Cote d'Ivoire
    abidjan: [5.3600, -4.0083] as [number, number],
    // Togo
    lome: [6.1375, 1.2123] as [number, number],
    // Benin
    cotonou: [6.3676, 2.4252] as [number, number],
    // Niger
    maradi: [13.5000, 7.1017] as [number, number],
    // Guinea
    conakry: [9.6412, -13.5784] as [number, number],
    // Guinea-Bissau
    bissau: [11.8636, -15.5977] as [number, number],
    // Gambia
    banjul: [13.4549, -16.5790] as [number, number],
    // Mauritania (border)
    nouakchottBorder: [16.0000, -16.5000] as [number, number],
    // Regional centers
    regional_westafrica: [9.0820, -2.0000] as [number, number],
    regional_sahel: [14.0000, -5.0000] as [number, number],
}

export const PROJECTS: Project[] = [
    {
        id: '1',
        name: 'Abidjan-Lagos Corridor Highway',
        country: 'Regional (Côte d\'Ivoire, Ghana, Togo, Benin, Nigeria)',
        location: COORDS.regional_westafrica,
        sector: 'Infrastructure & Construction',
        status: 'Planning',
        details: '1,028km six-lane motorway',
        investmentRange: '$500M - $3.0B',
        roi: '9-14% annually'
    },
    {
        id: '2',
        name: '300,000 bpd Oil Refinery',
        country: 'Ghana',
        location: COORDS.takoradi,
        sector: 'Oil & Gas',
        status: 'Development',
        details: 'New $7B refinery under construction',
        investmentRange: '$500M - $2.0B',
        roi: '15-22% annually'
    },
    {
        id: '3',
        name: 'Sangomar Oil Field Phase 2 Expansion',
        country: 'Senegal',
        location: COORDS.sangomar,
        sector: 'Oil & Gas',
        status: 'Planning',
        details: 'Expansion beyond 100,000 bpd capacity',
        investmentRange: '$500M - $2.0B',
        roi: '18-26% annually'
    },
    {
        id: '4',
        name: 'Greater Tortue Ahmeyim (GTA) LNG Phase 2',
        country: 'Senegal-Mauritania',
        location: COORDS.nouakchottBorder,
        sector: 'Oil & Gas',
        status: 'Planning',
        details: 'Phase 2 adds 2.5-3 mtpa capacity',
        investmentRange: '$300M - $1.5B',
        roi: '16-22% annually'
    },
    {
        id: '5',
        name: 'Central Spine Railway Project',
        country: 'Ghana',
        location: COORDS.kumasi,
        sector: 'Infrastructure & Construction',
        status: 'Planning',
        details: '595km railway to Burkina Faso & Sahel',
        investmentRange: '$300M - $1.5B',
        roi: '10-16% annually'
    },
    {
        id: '6',
        name: 'Sierra Leone Energy Compact - Mission 300',
        country: 'Sierra Leone',
        location: COORDS.freetown,
        sector: 'Renewable Energy',
        status: 'Planning',
        details: 'Raise electricity access from 36% to 80% by 2030',
        investmentRange: '$200M - $1.0B',
        roi: '13-19% annually'
    },
    {
        id: '7',
        name: 'Takoradi-Kumasi Western Railway Line',
        country: 'Ghana',
        location: [5.7867, -1.9167] as [number, number], // Midpoint
        sector: 'Infrastructure & Construction',
        status: 'Planning',
        details: '339km rehabilitation connecting mines',
        investmentRange: '$200M - $1.0B',
        roi: '12-18% annually'
    },
    {
        id: '8',
        name: 'Dangote Refinery Expansion & Integration',
        country: 'Nigeria',
        location: COORDS.lagos,
        sector: 'Oil & Gas',
        status: 'Operational',
        details: 'Africa\'s largest refinery downstream integration',
        investmentRange: '$100M - $1.0B',
        roi: '20-28% annually'
    },
    {
        id: '9',
        name: 'Accra-Kumasi Eastern Railway Line',
        country: 'Ghana',
        location: COORDS.accra,
        sector: 'Infrastructure & Construction',
        status: 'Planning',
        details: '300km railway with Tema Port branch',
        investmentRange: '$150M - $900M',
        roi: '11-17% annually'
    },
    {
        id: '10',
        name: 'Kano-Maradi Railway Project',
        country: 'Nigeria-Niger',
        location: COORDS.kano,
        sector: 'Infrastructure & Construction',
        status: 'Development',
        details: 'Cross-border railway linking Kano & Maradi',
        investmentRange: '$200M - $800M',
        roi: '10-15% annually'
    },
    {
        id: '11',
        name: 'Newmont Ahafo Mine Expansion',
        country: 'Ghana',
        location: COORDS.ahafo,
        sector: 'Mining & Minerals',
        status: 'Expansion',
        details: 'Gold mine expansion',
        investmentRange: '$200M - $800M',
        roi: '18-25% annually'
    },
    {
        id: '12',
        name: 'Nigeria Gas Industrialization - Ammonia Plant',
        country: 'Nigeria',
        location: COORDS.abuja,
        sector: 'Manufacturing & Industry',
        status: 'Development',
        details: '$1.4B ammonia & fertilizer plant',
        investmentRange: '$200M - $700M',
        roi: '16-24% annually'
    },
    {
        id: '13',
        name: 'ArcelorMittal Iron Ore Expansion',
        country: 'Liberia',
        location: COORDS.buchanan,
        sector: 'Mining & Minerals',
        status: 'Expansion',
        details: 'Increase production to 20M tonnes annually',
        investmentRange: '$200M - $600M',
        roi: '18-25% annually'
    },
    {
        id: '14',
        name: 'Lungi Bridge Project',
        country: 'Sierra Leone',
        location: COORDS.lungi,
        sector: 'Infrastructure & Construction',
        status: 'Planning',
        details: '8km bridge connecting Freetown to airport',
        investmentRange: '$200M - $600M',
        roi: '10-15% annually'
    },
    {
        id: '15',
        name: 'OMVG Interconnection Project',
        country: 'Regional (Gambia, Guinea, Guinea-Bissau, Senegal)',
        location: COORDS.banjul,
        sector: 'Power & Energy Infrastructure',
        status: 'Operational',
        details: '1,677km 225kV line',
        investmentRange: '$150M - $500M',
        roi: '10-15% annually'
    },
    {
        id: '16',
        name: 'Lagos-Calabar Coastal Highway Project',
        country: 'Nigeria',
        location: [5.4500, 6.0000] as [number, number], // Midpoint coast
        sector: 'Infrastructure & Construction',
        status: 'Development',
        details: '700km coastal highway',
        investmentRange: '$50M - $500M',
        roi: '12-18% annually'
    },
    {
        id: '17',
        name: 'Critical Minerals Exploration - Lithium & Cobalt',
        country: 'Liberia',
        location: COORDS.monrovia,
        sector: 'Mining & Minerals',
        status: 'Planning',
        details: '29 mineral blocks exploration',
        investmentRange: '$50M - $500M',
        roi: '22-35% annually'
    },
    {
        id: '18',
        name: 'Port of Lomé Container Terminal Expansion',
        country: 'Togo',
        location: COORDS.lome,
        sector: 'Infrastructure & Construction',
        status: 'Expansion',
        details: 'Expand to 2.7M TEU capacity',
        investmentRange: '$100M - $500M',
        roi: '14-20% annually'
    },
    {
        id: '19',
        name: 'Nigeria Upstream Oil Licensing Round',
        country: 'Nigeria',
        location: [4.5000, 6.0000] as [number, number], // Niger Delta offshore
        sector: 'Oil & Gas',
        status: 'Planning',
        details: '12 oil blocks available',
        investmentRange: '$50M - $500M',
        roi: '18-25% annually'
    },
    {
        id: '20',
        name: 'CLSG Regional Power Interconnector',
        country: 'Regional (Côte d\'Ivoire, Liberia, Sierra Leone, Guinea)',
        location: COORDS.abidjan,
        sector: 'Power & Energy Infrastructure',
        status: 'Operational',
        details: '1,303km 225kV transmission line',
        investmentRange: '$100M - $400M',
        roi: '11-16% annually'
    },
    {
        id: '21',
        name: 'Cardinal Namdini Gold Mine',
        country: 'Ghana',
        location: COORDS.namdini,
        sector: 'Mining & Minerals',
        status: 'Development',
        details: 'New mine producing 358,000 ounces annually',
        investmentRange: '$100M - $400M',
        roi: '20-28% annually'
    },
    {
        id: '22',
        name: 'North Core Interconnection - Benin Segment',
        country: 'Benin',
        location: COORDS.cotonou,
        sector: 'Power & Energy Infrastructure',
        status: 'Development',
        details: '913km transmission line segment',
        investmentRange: '$50M - $200M',
        roi: '11-16% annually'
    },
    {
        id: '23',
        name: 'Bo-Kenema Distribution System Rehabilitation',
        country: 'Sierra Leone',
        location: COORDS.bo,
        sector: 'Power & Energy Infrastructure',
        status: 'Development',
        details: 'Connect 50,500 households',
        investmentRange: '$50M - $150M',
        roi: '12-18% annually'
    },
    {
        id: '24',
        name: 'Guinea Hydroelectric Micro-Power Stations',
        country: 'Guinea',
        location: COORDS.conakry,
        sector: 'Renewable Energy',
        status: 'Development',
        details: 'Three hydroelectric micro-power stations',
        investmentRange: '$30M - $120M',
        roi: '13-19% annually'
    },
    {
        id: '25',
        name: 'Taraba 50MW Solar Photovoltaic Plant',
        country: 'Nigeria',
        location: COORDS.taraba,
        sector: 'Renewable Energy',
        status: 'Development',
        details: '50MW solar plant for 390,000 people',
        investmentRange: '$40M - $100M',
        roi: '14-20% annually'
    },
    // Additional projects to reach closer to 37
    {
        id: '26',
        name: 'Tema Industrial Port Expansion',
        country: 'Ghana',
        location: [5.6281, -0.0286] as [number, number],
        sector: 'Infrastructure & Construction',
        status: 'Development',
        details: 'Deepwater port modernization',
        investmentRange: '$150M - $600M',
        roi: '12-17% annually'
    },
    {
        id: '27',
        name: 'Bui Dam Solar Hybrid Project',
        country: 'Ghana',
        location: [8.2833, -2.2333] as [number, number],
        sector: 'Renewable Energy',
        status: 'Operational',
        details: '250MW solar-hydro hybrid',
        investmentRange: '$100M - $300M',
        roi: '11-15% annually'
    },
    {
        id: '28',
        name: 'Simandou Iron Ore Mine',
        country: 'Guinea',
        location: [8.6500, -8.9500] as [number, number],
        sector: 'Mining & Minerals',
        status: 'Development',
        details: 'World\'s largest untapped iron ore deposit',
        investmentRange: '$500M - $2.0B',
        roi: '20-30% annually'
    },
    {
        id: '29',
        name: 'Côte d\'Ivoire Metro Line 1',
        country: 'Côte d\'Ivoire',
        location: COORDS.abidjan,
        sector: 'Infrastructure & Construction',
        status: 'Development',
        details: '37km urban metro system',
        investmentRange: '$200M - $800M',
        roi: '8-12% annually'
    },
    {
        id: '30',
        name: 'Senegal Offshore Gas Development',
        country: 'Senegal',
        location: COORDS.dakar,
        sector: 'Oil & Gas',
        status: 'Development',
        details: 'New offshore gas fields development',
        investmentRange: '$300M - $1.0B',
        roi: '16-24% annually'
    },
    {
        id: '31',
        name: 'Niger-Benin Oil Pipeline',
        country: 'Niger-Benin',
        location: [10.0000, 3.0000] as [number, number],
        sector: 'Oil & Gas',
        status: 'Operational',
        details: '1,980km crude oil export pipeline',
        investmentRange: '$100M - $400M',
        roi: '15-22% annually'
    },
    {
        id: '32',
        name: 'Gambia River Basin Development',
        country: 'Gambia',
        location: COORDS.banjul,
        sector: 'Renewable Energy',
        status: 'Planning',
        details: 'Hydropower and irrigation',
        investmentRange: '$80M - $250M',
        roi: '10-14% annually'
    },
    {
        id: '33',
        name: 'Bissau Port Modernization',
        country: 'Guinea-Bissau',
        location: COORDS.bissau,
        sector: 'Infrastructure & Construction',
        status: 'Planning',
        details: 'Deep water port upgrade',
        investmentRange: '$50M - $200M',
        roi: '11-16% annually'
    },
    {
        id: '34',
        name: 'Nigeria Digital Free Zone',
        country: 'Nigeria',
        location: COORDS.lagos,
        sector: 'Manufacturing & Industry',
        status: 'Development',
        details: 'Tech hub and data center cluster',
        investmentRange: '$100M - $500M',
        roi: '18-25% annually'
    },
    {
        id: '35',
        name: 'West Africa Gas Pipeline Expansion',
        country: 'Regional (Nigeria, Benin, Togo, Ghana)',
        location: COORDS.cotonou,
        sector: 'Power & Energy Infrastructure',
        status: 'Planning',
        details: 'Expand capacity to 1 billion scf/day',
        investmentRange: '$200M - $600M',
        roi: '14-20% annually'
    },
    {
        id: '36',
        name: 'Togo Phosphate Mining Modernization',
        country: 'Togo',
        location: [6.8000, 1.3500] as [number, number],
        sector: 'Mining & Minerals',
        status: 'Development',
        details: 'Increase production efficiency',
        investmentRange: '$50M - $200M',
        roi: '15-22% annually'
    },
    {
        id: '37',
        name: 'Senegal Diamniadio Smart City',
        country: 'Senegal',
        location: [14.7000, -17.1800] as [number, number],
        sector: 'Infrastructure & Construction',
        status: 'Development',
        details: 'New smart city development',
        investmentRange: '$150M - $500M',
        roi: '12-18% annually'
    }
]
