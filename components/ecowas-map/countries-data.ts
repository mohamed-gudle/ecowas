import { Sector } from './types'

export interface Country {
    id: string
    name: string
    flag: string // Emoji flag
    capital: string
    region: string
    president: string
    presidentConfirmed: boolean
    population: string
    area: string
    gdp: string
    gdpGrowth: string
    currency: string
    language: string
    timezone: string
    readinessScore: number
    riskLevel: 'Low' | 'Medium' | 'High'
    delegationSize: number
    opportunitiesCount: number
    totalInvestment: string
    topSectors: Sector[]
    keyResources: string[]
}

export const COUNTRIES: Country[] = [
    {
        id: 'nigeria',
        name: 'Nigeria',
        flag: '🇳🇬',
        capital: 'Abuja',
        region: 'West Africa',
        president: 'H.E. Bola Ahmed Tinubu',
        presidentConfirmed: true,
        population: '223.8M',
        area: '923,768 km²',
        gdp: '$477B',
        gdpGrowth: '3.2%',
        currency: 'Nigerian Naira',
        language: 'English',
        timezone: 'WAT (UTC+1)',
        readinessScore: 92,
        riskLevel: 'Low',
        delegationSize: 45,
        opportunitiesCount: 8,
        totalInvestment: '$12.5B',
        topSectors: ['Oil & Gas', 'Infrastructure & Construction', 'Manufacturing & Industry'],
        keyResources: ['Crude Oil', 'Natural Gas', 'Cocoa', 'Palm Oil', 'Tin', 'Iron Ore']
    },
    {
        id: 'ghana',
        name: 'Ghana',
        flag: '🇬🇭',
        capital: 'Accra',
        region: 'West Africa',
        president: 'H.E. John Dramani Mahama',
        presidentConfirmed: true,
        population: '33.5M',
        area: '238,535 km²',
        gdp: '$77B',
        gdpGrowth: '4.8%',
        currency: 'Ghanaian Cedi',
        language: 'English',
        timezone: 'GMT (UTC+0)',
        readinessScore: 88,
        riskLevel: 'Low',
        delegationSize: 32,
        opportunitiesCount: 9,
        totalInvestment: '$8.2B',
        topSectors: ['Mining & Minerals', 'Infrastructure & Construction', 'Renewable Energy'],
        keyResources: ['Gold', 'Cocoa', 'Oil', 'Bauxite', 'Manganese']
    },
    {
        id: 'senegal',
        name: 'Senegal',
        flag: '🇸🇳',
        capital: 'Dakar',
        region: 'West Africa',
        president: 'H.E. Bassirou Diomaye Faye',
        presidentConfirmed: true,
        population: '17.7M',
        area: '196,722 km²',
        gdp: '$28B',
        gdpGrowth: '5.5%',
        currency: 'CFA Franc',
        language: 'French',
        timezone: 'GMT (UTC+0)',
        readinessScore: 85,
        riskLevel: 'Low',
        delegationSize: 28,
        opportunitiesCount: 5,
        totalInvestment: '$6.8B',
        topSectors: ['Oil & Gas', 'Infrastructure & Construction', 'Renewable Energy'],
        keyResources: ['Fish', 'Phosphates', 'Oil', 'Natural Gas', 'Groundnuts']
    },
    {
        id: 'cote-divoire',
        name: "Côte d'Ivoire",
        flag: '🇨🇮',
        capital: 'Yamoussoukro',
        region: 'West Africa',
        president: 'H.E. Alassane Ouattara',
        presidentConfirmed: true,
        population: '28.2M',
        area: '322,463 km²',
        gdp: '$70B',
        gdpGrowth: '6.2%',
        currency: 'CFA Franc',
        language: 'French',
        timezone: 'GMT (UTC+0)',
        readinessScore: 82,
        riskLevel: 'Low',
        delegationSize: 35,
        opportunitiesCount: 3,
        totalInvestment: '$4.5B',
        topSectors: ['Infrastructure & Construction', 'Power & Energy Infrastructure'],
        keyResources: ['Cocoa', 'Coffee', 'Palm Oil', 'Rubber', 'Diamonds']
    },
    {
        id: 'togo',
        name: 'Togo',
        flag: '🇹🇬',
        capital: 'Lomé',
        region: 'West Africa',
        president: 'H.E. Faure Gnassingbé',
        presidentConfirmed: false,
        population: '8.8M',
        area: '56,785 km²',
        gdp: '$9B',
        gdpGrowth: '5.1%',
        currency: 'CFA Franc',
        language: 'French',
        timezone: 'GMT (UTC+0)',
        readinessScore: 75,
        riskLevel: 'Low',
        delegationSize: 18,
        opportunitiesCount: 2,
        totalInvestment: '$1.2B',
        topSectors: ['Infrastructure & Construction', 'Mining & Minerals'],
        keyResources: ['Phosphates', 'Cotton', 'Coffee', 'Cocoa']
    },
    {
        id: 'benin',
        name: 'Benin',
        flag: '🇧🇯',
        capital: 'Porto-Novo',
        region: 'West Africa',
        president: 'H.E. Patrice Talon',
        presidentConfirmed: false,
        population: '13.4M',
        area: '114,763 km²',
        gdp: '$18B',
        gdpGrowth: '5.8%',
        currency: 'CFA Franc',
        language: 'French',
        timezone: 'WAT (UTC+1)',
        readinessScore: 72,
        riskLevel: 'Low',
        delegationSize: 15,
        opportunitiesCount: 1,
        totalInvestment: '$850M',
        topSectors: ['Power & Energy Infrastructure'],
        keyResources: ['Cotton', 'Palm Products', 'Corn', 'Cassava']
    },
    {
        id: 'liberia',
        name: 'Liberia',
        flag: '🇱🇷',
        capital: 'Monrovia',
        region: 'West Africa',
        president: 'H.E. Joseph Boakai',
        presidentConfirmed: false,
        population: '5.4M',
        area: '111,369 km²',
        gdp: '$4B',
        gdpGrowth: '4.2%',
        currency: 'Liberian Dollar',
        language: 'English',
        timezone: 'GMT (UTC+0)',
        readinessScore: 68,
        riskLevel: 'Medium',
        delegationSize: 12,
        opportunitiesCount: 3,
        totalInvestment: '$2.1B',
        topSectors: ['Mining & Minerals'],
        keyResources: ['Iron Ore', 'Rubber', 'Diamonds', 'Gold', 'Timber']
    },
    {
        id: 'sierra-leone',
        name: 'Sierra Leone',
        flag: '🇸🇱',
        capital: 'Freetown',
        region: 'West Africa',
        president: 'H.E. Julius Maada Bio',
        presidentConfirmed: false,
        population: '8.6M',
        area: '71,740 km²',
        gdp: '$4.2B',
        gdpGrowth: '3.5%',
        currency: 'Sierra Leonean Leone',
        language: 'English',
        timezone: 'GMT (UTC+0)',
        readinessScore: 65,
        riskLevel: 'Medium',
        delegationSize: 14,
        opportunitiesCount: 3,
        totalInvestment: '$1.8B',
        topSectors: ['Renewable Energy', 'Power & Energy Infrastructure', 'Infrastructure & Construction'],
        keyResources: ['Diamonds', 'Iron Ore', 'Bauxite', 'Rutile', 'Fish']
    },
    {
        id: 'guinea',
        name: 'Guinea',
        flag: '🇬🇳',
        capital: 'Conakry',
        region: 'West Africa',
        president: 'H.E. Mamadi Doumbouya',
        presidentConfirmed: false,
        population: '14.2M',
        area: '245,857 km²',
        gdp: '$21B',
        gdpGrowth: '4.5%',
        currency: 'Guinean Franc',
        language: 'French',
        timezone: 'GMT (UTC+0)',
        readinessScore: 62,
        riskLevel: 'Medium',
        delegationSize: 16,
        opportunitiesCount: 2,
        totalInvestment: '$3.5B',
        topSectors: ['Mining & Minerals', 'Renewable Energy'],
        keyResources: ['Bauxite', 'Iron Ore', 'Gold', 'Diamonds', 'Uranium']
    },
    {
        id: 'guinea-bissau',
        name: 'Guinea-Bissau',
        flag: '🇬🇼',
        capital: 'Bissau',
        region: 'West Africa',
        president: 'H.E. Umaro Sissoco Embaló',
        presidentConfirmed: false,
        population: '2.1M',
        area: '36,125 km²',
        gdp: '$1.9B',
        gdpGrowth: '3.8%',
        currency: 'CFA Franc',
        language: 'Portuguese',
        timezone: 'GMT (UTC+0)',
        readinessScore: 55,
        riskLevel: 'Medium',
        delegationSize: 8,
        opportunitiesCount: 1,
        totalInvestment: '$450M',
        topSectors: ['Infrastructure & Construction'],
        keyResources: ['Cashews', 'Fish', 'Timber', 'Phosphates']
    },
    {
        id: 'gambia',
        name: 'Gambia',
        flag: '🇬🇲',
        capital: 'Banjul',
        region: 'West Africa',
        president: 'H.E. Adama Barrow',
        presidentConfirmed: false,
        population: '2.6M',
        area: '10,689 km²',
        gdp: '$2.3B',
        gdpGrowth: '4.9%',
        currency: 'Dalasi',
        language: 'English',
        timezone: 'GMT (UTC+0)',
        readinessScore: 58,
        riskLevel: 'Low',
        delegationSize: 10,
        opportunitiesCount: 1,
        totalInvestment: '$380M',
        topSectors: ['Renewable Energy', 'Power & Energy Infrastructure'],
        keyResources: ['Groundnuts', 'Fish', 'Cotton']
    }
]

// Calculate aggregate stats
export const getCountryStats = () => {
    const totalCountries = COUNTRIES.length
    const presidentsConfirmed = COUNTRIES.filter(c => c.presidentConfirmed).length
    const totalOpportunities = COUNTRIES.reduce((sum, c) => sum + c.opportunitiesCount, 0)
    const avgReadiness = Math.round(COUNTRIES.reduce((sum, c) => sum + c.readinessScore, 0) / totalCountries)

    return {
        totalCountries,
        presidentsConfirmed,
        totalOpportunities,
        avgReadiness
    }
}
