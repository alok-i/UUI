import { Location } from '../models';

export const locations: Omit<Location, 'children'>[] = [
    {
        id: 'c-AF',
        type: 'continent',
        name: 'Africa',
        parentId: null,
        __typename: 'Location',
        childCount: 3,
    },
    {
        id: 'DZ',
        name: 'Algeria',
        type: 'country',
        parentId: 'c-AF',
        __typename: 'Location',
        childCount: 10,
    },
    {
        id: '2413920',
        name: 'Bakau',
        asciiname: 'Bakau',
        lat: '13.47806',
        lon: '-16.68194',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'GM',
        altCountry: '',
        adminCode: '01',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '43098',
        elevation: '',
        dem: '22',
        tz: 'Africa/Banjul',
        lastModified: '2012-01-18',
        countryName: 'Gambia',
        type: 'city',
        parentId: 'GM',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2413876',
        name: 'Banjul',
        asciiname: 'Banjul',
        lat: '13.45274',
        lon: '-16.57803',
        featureClass: 'P',
        featureCode: 'PPLC',
        country: 'GM',
        altCountry: '',
        adminCode: '01',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '34589',
        elevation: '',
        dem: '5',
        tz: 'Africa/Banjul',
        lastModified: '2015-11-01',
        countryName: 'Gambia',
        type: 'city',
        parentId: 'GM',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: 'BJ',
        name: 'Benin',
        type: 'country',
        parentId: 'c-AF',
        __typename: 'Location',
        childCount: 10,
    },
    {
        id: '2474141',
        name: 'Boumerdas',
        asciiname: 'Boumerdas',
        lat: '36.76639',
        lon: '3.47717',
        featureClass: 'P',
        featureCode: 'PPLA',
        country: 'DZ',
        altCountry: '',
        adminCode: '40',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '786499',
        elevation: '',
        dem: '5',
        tz: 'Africa/Algiers',
        lastModified: '2012-01-14',
        countryName: 'Algeria',
        type: 'city',
        parentId: 'DZ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2413753',
        name: 'Brikama',
        asciiname: 'Brikama',
        lat: '13.27136',
        lon: '-16.64944',
        featureClass: 'P',
        featureCode: 'PPLA',
        country: 'GM',
        altCountry: '',
        adminCode: '05',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '77700',
        elevation: '',
        dem: '24',
        tz: 'Africa/Banjul',
        lastModified: '2011-02-02',
        countryName: 'Gambia',
        type: 'city',
        parentId: 'GM',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: 'c-EU',
        type: 'continent',
        name: 'Europe',
        parentId: null,
        __typename: 'Location',
        childCount: 1,
    },
    {
        id: '2413515',
        name: 'Farafenni',
        asciiname: 'Farafenni',
        lat: '13.56667',
        lon: '-15.6',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'GM',
        altCountry: '',
        adminCode: '07',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '29867',
        elevation: '',
        dem: '15',
        tz: 'Africa/Banjul',
        lastModified: '2012-01-18',
        countryName: 'Gambia',
        type: 'city',
        parentId: 'GM',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: 'GM',
        name: 'Gambia',
        type: 'country',
        parentId: 'c-AF',
        __typename: 'Location',
        childCount: 6,
    },
    {
        id: '2412749',
        name: 'Lamin',
        asciiname: 'Lamin',
        alternativeNames: [
            '',
        ],
        lat: '13.35222',
        lon: '-16.43389',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'GM',
        altCountry: '',
        adminCode: '07',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '24797',
        elevation: '',
        dem: '15',
        tz: 'Africa/Banjul',
        lastModified: '2006-01-17',
        countryName: 'Gambia',
        type: 'city',
        parentId: 'GM',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2392505',
        name: 'Nikki',
        asciiname: 'Nikki',
        lat: '9.94009',
        lon: '3.21075',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'BJ',
        altCountry: '',
        adminCode: '10',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '54009',
        elevation: '',
        dem: '403',
        tz: 'Africa/Porto-Novo',
        lastModified: '2012-01-18',
        countryName: 'Benin',
        type: 'city',
        parentId: 'BJ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2392308',
        name: 'Ouidah',
        asciiname: 'Ouidah',
        lat: '6.36307',
        lon: '2.08506',
        featureClass: 'P',
        featureCode: 'PPLA',
        country: 'BJ',
        altCountry: '',
        adminCode: '09',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '83503',
        elevation: '',
        dem: '17',
        tz: 'Africa/Porto-Novo',
        lastModified: '2012-01-18',
        countryName: 'Benin',
        type: 'city',
        parentId: 'BJ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2392204',
        name: 'Parakou',
        asciiname: 'Parakou',
        lat: '9.33716',
        lon: '2.63031',
        featureClass: 'P',
        featureCode: 'PPLA',
        country: 'BJ',
        altCountry: '',
        adminCode: '10',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '163753',
        elevation: '',
        dem: '369',
        tz: 'Africa/Porto-Novo',
        lastModified: '2012-01-18',
        countryName: 'Benin',
        type: 'city',
        parentId: 'BJ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2392108',
        name: 'Pobé',
        asciiname: 'Pobe',
        lat: '6.98008',
        lon: '2.6649',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'BJ',
        altCountry: '',
        adminCode: '17',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '32983',
        elevation: '',
        dem: '136',
        tz: 'Africa/Porto-Novo',
        lastModified: '2012-10-18',
        countryName: 'Benin',
        type: 'city',
        parentId: 'BJ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2392087',
        name: 'Porto-Novo',
        asciiname: 'Porto-Novo',
        lat: '6.49646',
        lon: '2.60359',
        featureClass: 'P',
        featureCode: 'PPLC',
        country: 'BJ',
        altCountry: '',
        adminCode: '16',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '234168',
        elevation: '',
        dem: '20',
        tz: 'Africa/Porto-Novo',
        lastModified: '2011-03-04',
        countryName: 'Benin',
        type: 'city',
        parentId: 'BJ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2392009',
        name: 'Sakété',
        asciiname: 'Sakete',
        lat: '6.73618',
        lon: '2.65866',
        featureClass: 'P',
        featureCode: 'PPLA',
        country: 'BJ',
        altCountry: '',
        adminCode: '17',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '30111',
        elevation: '',
        dem: '80',
        tz: 'Africa/Porto-Novo',
        lastModified: '2012-01-18',
        countryName: 'Benin',
        type: 'city',
        parentId: 'BJ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2391895',
        name: 'Savalou',
        asciiname: 'Savalou',
        lat: '7.92807',
        lon: '1.97558',
        featureClass: 'P',
        featureCode: 'PPLA',
        country: 'BJ',
        altCountry: '',
        adminCode: '11',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '30187',
        elevation: '',
        dem: '181',
        tz: 'Africa/Porto-Novo',
        lastModified: '2012-01-18',
        countryName: 'Benin',
        type: 'city',
        parentId: 'BJ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2391893',
        name: 'Savé',
        asciiname: 'Save',
        lat: '8.03424',
        lon: '2.4866',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'BJ',
        altCountry: '',
        adminCode: '11',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '75970',
        elevation: '',
        dem: '190',
        tz: 'Africa/Porto-Novo',
        lastModified: '2013-05-18',
        countryName: 'Benin',
        type: 'city',
        parentId: 'BJ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2411880',
        name: 'Sukuta',
        asciiname: 'Sukuta',
        lat: '13.41033',
        lon: '-16.70815',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'GM',
        altCountry: '',
        adminCode: '05',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '15131',
        elevation: '',
        dem: '27',
        tz: 'Africa/Banjul',
        lastModified: '2011-02-02',
        countryName: 'Gambia',
        type: 'city',
        parentId: 'GM',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2391455',
        name: 'Tanguiéta',
        asciiname: 'Tanguieta',
        lat: '10.62118',
        lon: '1.26651',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'BJ',
        altCountry: '',
        adminCode: '08',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '19833',
        elevation: '',
        dem: '242',
        tz: 'Africa/Porto-Novo',
        lastModified: '2012-01-18',
        countryName: 'Benin',
        type: 'city',
        parentId: 'BJ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2391377',
        name: 'Tchaourou',
        asciiname: 'Tchaourou',
        lat: '8.88649',
        lon: '2.59753',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'BJ',
        altCountry: '',
        adminCode: '10',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '20971',
        elevation: '',
        dem: '332',
        tz: 'Africa/Porto-Novo',
        lastModified: '2012-10-18',
        countryName: 'Benin',
        type: 'city',
        parentId: 'BJ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2475744',
        name: 'Tizi Ouzou',
        asciiname: 'Tizi Ouzou',
        lat: '36.71182',
        lon: '4.04591',
        featureClass: 'P',
        featureCode: 'PPLA',
        country: 'DZ',
        altCountry: '',
        adminCode: '14',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '144000',
        elevation: '',
        dem: '206',
        tz: 'Africa/Algiers',
        lastModified: '2013-08-04',
        countryName: 'Algeria',
        type: 'city',
        parentId: 'DZ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2475740',
        name: 'Tizi Rached',
        asciiname: 'Tizi Rached',
        lat: '36.67176',
        lon: '4.19176',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'DZ',
        altCountry: '',
        adminCode: '14',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '17872',
        elevation: '',
        dem: '405',
        tz: 'Africa/Algiers',
        lastModified: '2012-01-19',
        countryName: 'Algeria',
        type: 'city',
        parentId: 'DZ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2475752',
        name: 'Tizi-n-Tleta',
        asciiname: 'Tizi-n-Tleta',
        lat: '36.54569',
        lon: '4.05712',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'DZ',
        altCountry: '',
        adminCode: '14',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '22404',
        elevation: '',
        dem: '483',
        tz: 'Africa/Algiers',
        lastModified: '2011-04-19',
        countryName: 'Algeria',
        type: 'city',
        parentId: 'DZ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2475687',
        name: 'Tlemcen',
        asciiname: 'Tlemcen',
        lat: '34.87833',
        lon: '-1.315',
        featureClass: 'P',
        featureCode: 'PPLA',
        country: 'DZ',
        altCountry: '',
        adminCode: '15',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '132341',
        elevation: '',
        dem: '811',
        tz: 'Africa/Algiers',
        lastModified: '2012-01-19',
        countryName: 'Algeria',
        type: 'city',
        parentId: 'DZ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2475612',
        name: 'Tolga',
        asciiname: 'Tolga',
        lat: '34.72224',
        lon: '5.37845',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'DZ',
        altCountry: '',
        adminCode: '19',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '68246',
        elevation: '',
        dem: '161',
        tz: 'Africa/Algiers',
        lastModified: '2012-01-19',
        countryName: 'Algeria',
        type: 'city',
        parentId: 'DZ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2475475',
        name: 'Touggourt',
        asciiname: 'Touggourt',
        lat: '33.10527',
        lon: '6.05796',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'DZ',
        altCountry: '',
        adminCode: '50',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '49044',
        elevation: '',
        dem: '72',
        tz: 'Africa/Algiers',
        lastModified: '2012-01-19',
        countryName: 'Algeria',
        type: 'city',
        parentId: 'DZ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: 'GB',
        name: 'United Kingdom',
        type: 'country',
        parentId: 'c-EU',
        __typename: 'Location',
        childCount: 10,
    },
    {
        id: '2633655',
        name: 'Woodford Green',
        asciiname: 'Woodford Green',
        lat: '51.60938',
        lon: '0.02329',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'GB',
        altCountry: '',
        adminCode: 'ENG',
        countrySubdivision: 'GLA',
        municipality: 'K8',
        municipalitySubdivision: '',
        population: '22803',
        elevation: '',
        dem: '62',
        tz: 'Europe/London',
        lastModified: '2012-05-18',
        countryName: 'United Kingdom',
        type: 'city',
        parentId: 'GB',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2633563',
        name: 'Worcester',
        asciiname: 'Worcester',
        lat: '52.18935',
        lon: '-2.22001',
        featureClass: 'P',
        featureCode: 'PPLA2',
        country: 'GB',
        altCountry: '',
        adminCode: 'ENG',
        countrySubdivision: 'Q4',
        municipality: '47UE',
        municipalitySubdivision: '',
        population: '100023',
        elevation: '',
        dem: '29',
        tz: 'Europe/London',
        lastModified: '2016-10-30',
        countryName: 'United Kingdom',
        type: 'city',
        parentId: 'GB',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2633553',
        name: 'Workington',
        asciiname: 'Workington',
        lat: '54.6425',
        lon: '-3.54413',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'GB',
        altCountry: '',
        adminCode: 'ENG',
        countrySubdivision: 'C9',
        municipality: '16UB',
        municipalitySubdivision: '',
        population: '20618',
        elevation: '',
        dem: '20',
        tz: 'Europe/London',
        lastModified: '2011-03-03',
        countryName: 'United Kingdom',
        type: 'city',
        parentId: 'GB',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2633551',
        name: 'Worksop',
        asciiname: 'Worksop',
        lat: '53.30182',
        lon: '-1.12404',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'GB',
        altCountry: '',
        adminCode: 'ENG',
        countrySubdivision: 'J9',
        municipality: '37UC',
        municipalitySubdivision: '',
        population: '40443',
        elevation: '',
        dem: '46',
        tz: 'Europe/London',
        lastModified: '2011-03-03',
        countryName: 'United Kingdom',
        type: 'city',
        parentId: 'GB',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2633521',
        name: 'Worthing',
        asciiname: 'Worthing',
        lat: '50.81795',
        lon: '-0.37538',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'GB',
        altCountry: '',
        adminCode: 'ENG',
        countrySubdivision: 'P6',
        municipality: '45UH',
        municipalitySubdivision: '',
        population: '99110',
        elevation: '',
        dem: '7',
        tz: 'Europe/London',
        lastModified: '2014-09-14',
        countryName: 'United Kingdom',
        type: 'city',
        parentId: 'GB',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2633485',
        name: 'Wrexham',
        asciiname: 'Wrexham',
        lat: '53.04664',
        lon: '-2.99132',
        featureClass: 'P',
        featureCode: 'PPLA2',
        country: 'GB',
        altCountry: '',
        adminCode: 'WLS',
        countrySubdivision: 'Z4',
        municipality: '00NL007',
        municipalitySubdivision: '',
        population: '43649',
        elevation: '',
        dem: '87',
        tz: 'Europe/London',
        lastModified: '2011-03-03',
        countryName: 'United Kingdom',
        type: 'city',
        parentId: 'GB',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2633406',
        name: 'Yate',
        asciiname: 'Yate',
        lat: '51.54074',
        lon: '-2.41839',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'GB',
        altCountry: '',
        adminCode: 'ENG',
        countrySubdivision: 'M6',
        municipality: '00HD044',
        municipalitySubdivision: '',
        population: '21789',
        elevation: '',
        dem: '80',
        tz: 'Europe/London',
        lastModified: '2012-03-26',
        countryName: 'United Kingdom',
        type: 'city',
        parentId: 'GB',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2633397',
        name: 'Yeadon',
        asciiname: 'Yeadon',
        lat: '53.86437',
        lon: '-1.68743',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'GB',
        altCountry: '',
        adminCode: 'ENG',
        countrySubdivision: 'H3',
        municipality: '',
        municipalitySubdivision: '',
        population: '37379',
        elevation: '',
        dem: '165',
        tz: 'Europe/London',
        lastModified: '2013-07-11',
        countryName: 'United Kingdom',
        type: 'city',
        parentId: 'GB',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2633373',
        name: 'Yeovil',
        asciiname: 'Yeovil',
        lat: '50.94159',
        lon: '-2.63211',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'GB',
        altCountry: '',
        adminCode: 'ENG',
        countrySubdivision: 'M3',
        municipality: '40UD',
        municipalitySubdivision: '',
        population: '43733',
        elevation: '',
        dem: '55',
        tz: 'Europe/London',
        lastModified: '2011-03-03',
        countryName: 'United Kingdom',
        type: 'city',
        parentId: 'GB',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2633352',
        name: 'York',
        asciiname: 'York',
        lat: '53.95763',
        lon: '-1.08271',
        featureClass: 'P',
        featureCode: 'PPLA2',
        country: 'GB',
        altCountry: '',
        adminCode: 'ENG',
        countrySubdivision: 'Q5',
        municipality: '',
        municipalitySubdivision: '',
        population: '144202',
        elevation: '',
        dem: '17',
        tz: 'Europe/London',
        lastModified: '2012-03-30',
        countryName: 'United Kingdom',
        type: 'city',
        parentId: 'GB',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2474638',
        name: 'Zemoura',
        asciiname: 'Zemoura',
        lat: '35.72251',
        lon: '0.75509',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'DZ',
        altCountry: '',
        adminCode: '51',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '21770',
        elevation: '',
        dem: '288',
        tz: 'Africa/Algiers',
        lastModified: '2012-01-19',
        countryName: 'Algeria',
        type: 'city',
        parentId: 'DZ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2474583',
        name: 'Zeralda',
        asciiname: 'Zeralda',
        lat: '36.71169',
        lon: '2.84244',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'DZ',
        altCountry: '',
        adminCode: '55',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '17563',
        elevation: '',
        dem: '30',
        tz: 'Africa/Algiers',
        lastModified: '2012-05-06',
        countryName: 'Algeria',
        type: 'city',
        parentId: 'DZ',
        __typename: 'Location',
        childCount: 0,
    },
    {
        id: '2474506',
        name: 'Zeribet el Oued',
        asciiname: 'Zeribet el Oued',
        lat: '34.68284',
        lon: '6.51109',
        featureClass: 'P',
        featureCode: 'PPL',
        country: 'DZ',
        altCountry: '',
        adminCode: '19',
        countrySubdivision: '',
        municipality: '',
        municipalitySubdivision: '',
        population: '23187',
        elevation: '',
        dem: '47',
        tz: 'Africa/Algiers',
        lastModified: '2012-01-19',
        countryName: 'Algeria',
        type: 'city',
        parentId: 'DZ',
        __typename: 'Location',
        childCount: 0,
    },
];