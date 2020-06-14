import { Injectable, Inject, LOCALE_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private countries = {
    // tslint:disable-next-line: max-line-length
    'en-US': [{ key: 'AF', value: 'Afghanistan'}, { key: 'AL', value: 'Albania'}, { key: 'DZ', value: 'Algeria'}, { key: 'AS', value: 'American Samoa'}, { key: 'AD', value: 'Andorra'}, { key: 'AO', value: 'Angola'}, { key: 'AI', value: 'Anguilla'}, { key: 'AQ', value: 'Antarctica'}, { key: 'AG', value: 'Antigua and Barbuda'}, { key: 'AR', value: 'Argentina'}, { key: 'AM', value: 'Armenia'}, { key: 'AW', value: 'Aruba'}, { key: 'AU', value: 'Australia'}, { key: 'AT', value: 'Austria'}, { key: 'AZ', value: 'Azerbaijan'}, { key: 'BS', value: 'Bahamas (the)'}, { key: 'BH', value: 'Bahrain'}, { key: 'BD', value: 'Bangladesh'}, { key: 'BB', value: 'Barbados'}, { key: 'BY', value: 'Belarus'}, { key: 'BE', value: 'Belgium'}, { key: 'BZ', value: 'Belize'}, { key: 'BJ', value: 'Benin'}, { key: 'BM', value: 'Bermuda'}, { key: 'BT', value: 'Bhutan'}, { key: 'BO', value: 'Bolivia (Plurinational State of)'}, { key: 'BQ', value: 'Bonaire, Sint Eustatius and Saba'}, { key: 'BA', value: 'Bosnia and Herzegovina'}, { key: 'BW', value: 'Botswana'}, { key: 'BV', value: 'Bouvet Island'}, { key: 'BR', value: 'Brazil'}, { key: 'IO', value: 'British Indian Ocean Territory (the)'}, { key: 'BN', value: 'Brunei Darussalam'}, { key: 'BG', value: 'Bulgaria'}, { key: 'BF', value: 'Burkina Faso'}, { key: 'BI', value: 'Burundi'}, { key: 'CV', value: 'Cabo Verde'}, { key: 'KH', value: 'Cambodia'}, { key: 'CM', value: 'Cameroon'}, { key: 'CA', value: 'Canada'}, { key: 'KY', value: 'Cayman Islands (the)'}, { key: 'CF', value: 'Central African Republic (the)'}, { key: 'TD', value: 'Chad'}, { key: 'CL', value: 'Chile'}, { key: 'CN', value: 'China'}, { key: 'CX', value: 'Christmas Island'}, { key: 'CC', value: 'Cocos (Keeling) Islands (the)'}, { key: 'CO', value: 'Colombia'}, { key: 'KM', value: 'Comoros (the)'}, { key: 'CD', value: 'Congo (the Democratic Republic of the)'}, { key: 'CG', value: 'Congo (the)'}, { key: 'CK', value: 'Cook Islands (the)'}, { key: 'CR', value: 'Costa Rica'}, { key: 'HR', value: 'Croatia'}, { key: 'CU', value: 'Cuba'}, { key: 'CW', value: 'Curaçao'}, { key: 'CY', value: 'Cyprus'}, { key: 'CZ', value: 'Czechia'}, { key: 'CI', value: 'Côte d\'Ivoire'}, { key: 'DK', value: 'Denmark'}, { key: 'DJ', value: 'Djibouti'}, { key: 'DM', value: 'Dominica'}, { key: 'DO', value: 'Dominican Republic (the)'}, { key: 'EC', value: 'Ecuador'}, { key: 'EG', value: 'Egypt'}, { key: 'SV', value: 'El Salvador'}, { key: 'GQ', value: 'Equatorial Guinea'}, { key: 'ER', value: 'Eritrea'}, { key: 'EE', value: 'Estonia'}, { key: 'SZ', value: 'Eswatini'}, { key: 'ET', value: 'Ethiopia'}, { key: 'FK', value: 'Falkland Islands (the) [Malvinas]'}, { key: 'FO', value: 'Faroe Islands (the)'}, { key: 'FJ', value: 'Fiji'}, { key: 'FI', value: 'Finland'}, { key: 'FR', value: 'France'}, { key: 'GF', value: 'French Guiana'}, { key: 'PF', value: 'French Polynesia'}, { key: 'TF', value: 'French Southern Territories (the)'}, { key: 'GA', value: 'Gabon'}, { key: 'GM', value: 'Gambia (the)'}, { key: 'GE', value: 'Georgia'}, { key: 'DE', value: 'Germany'}, { key: 'GH', value: 'Ghana'}, { key: 'GI', value: 'Gibraltar'}, { key: 'GR', value: 'Greece'}, { key: 'GL', value: 'Greenland'}, { key: 'GD', value: 'Grenada'}, { key: 'GP', value: 'Guadeloupe'}, { key: 'GU', value: 'Guam'}, { key: 'GT', value: 'Guatemala'}, { key: 'GG', value: 'Guernsey'}, { key: 'GN', value: 'Guinea'}, { key: 'GW', value: 'Guinea-Bissau'}, { key: 'GY', value: 'Guyana'}, { key: 'HT', value: 'Haiti'}, { key: 'HM', value: 'Heard Island and McDonald Islands'}, { key: 'VA', value: 'Holy See (the)'}, { key: 'HN', value: 'Honduras'}, { key: 'HK', value: 'Hong Kong'}, { key: 'HU', value: 'Hungary'}, { key: 'IS', value: 'Iceland'}, { key: 'IN', value: 'India'}, { key: 'ID', value: 'Indonesia'}, { key: 'IR', value: 'Iran (Islamic Republic of)'}, { key: 'IQ', value: 'Iraq'}, { key: 'IE', value: 'Ireland'}, { key: 'IM', value: 'Isle of Man'}, { key: 'IL', value: 'Israel'}, { key: 'IT', value: 'Italy'}, { key: 'JM', value: 'Jamaica'}, { key: 'JP', value: 'Japan'}, { key: 'JE', value: 'Jersey'}, { key: 'JO', value: 'Jordan'}, { key: 'KZ', value: 'Kazakhstan'}, { key: 'KE', value: 'Kenya'}, { key: 'KI', value: 'Kiribati'}, { key: 'KP', value: 'Korea (the Democratic People\'s Republic of)'}, { key: 'KR', value: 'Korea (the Republic of)'}, { key: 'KW', value: 'Kuwait'}, { key: 'KG', value: 'Kyrgyzstan'}, { key: 'LA', value: 'Lao People\'s Democratic Republic (the)'}, { key: 'LV', value: 'Latvia'}, { key: 'LB', value: 'Lebanon'}, { key: 'LS', value: 'Lesotho'}, { key: 'LR', value: 'Liberia'}, { key: 'LY', value: 'Libya'}, { key: 'LI', value: 'Liechtenstein'}, { key: 'LT', value: 'Lithuania'}, { key: 'LU', value: 'Luxembourg'}, { key: 'MO', value: 'Macao'}, { key: 'MG', value: 'Madagascar'}, { key: 'MW', value: 'Malawi'}, { key: 'MY', value: 'Malaysia'}, { key: 'MV', value: 'Maldives'}, { key: 'ML', value: 'Mali'}, { key: 'MT', value: 'Malta'}, { key: 'MH', value: 'Marshall Islands (the)'}, { key: 'MQ', value: 'Martinique'}, { key: 'MR', value: 'Mauritania'}, { key: 'MU', value: 'Mauritius'}, { key: 'YT', value: 'Mayotte'}, { key: 'MX', value: 'Mexico'}, { key: 'FM', value: 'Micronesia (Federated States of)'}, { key: 'MD', value: 'Moldova (the Republic of)'}, { key: 'MC', value: 'Monaco'}, { key: 'MN', value: 'Mongolia'}, { key: 'ME', value: 'Montenegro'}, { key: 'MS', value: 'Montserrat'}, { key: 'MA', value: 'Morocco'}, { key: 'MZ', value: 'Mozambique'}, { key: 'MM', value: 'Myanmar'}, { key: 'NA', value: 'Namibia'}, { key: 'NR', value: 'Nauru'}, { key: 'NP', value: 'Nepal'}, { key: 'NL', value: 'Netherlands (the)'}, { key: 'NC', value: 'New Caledonia'}, { key: 'NZ', value: 'New Zealand'}, { key: 'NI', value: 'Nicaragua'}, { key: 'NE', value: 'Niger (the)'}, { key: 'NG', value: 'Nigeria'}, { key: 'NU', value: 'Niue'}, { key: 'NF', value: 'Norfolk Island'}, { key: 'MP', value: 'Northern Mariana Islands (the)'}, { key: 'NO', value: 'Norway'}, { key: 'OM', value: 'Oman'}, { key: 'PK', value: 'Pakistan'}, { key: 'PW', value: 'Palau'}, { key: 'PS', value: 'Palestine, State of'}, { key: 'PA', value: 'Panama'}, { key: 'PG', value: 'Papua New Guinea'}, { key: 'PY', value: 'Paraguay'}, { key: 'PE', value: 'Peru'}, { key: 'PH', value: 'Philippines (the)'}, { key: 'PN', value: 'Pitcairn'}, { key: 'PL', value: 'Poland'}, { key: 'PT', value: 'Portugal'}, { key: 'PR', value: 'Puerto Rico'}, { key: 'QA', value: 'Qatar'}, { key: 'MK', value: 'Republic of North Macedonia'}, { key: 'RO', value: 'Romania'}, { key: 'RU', value: 'Russian Federation (the)'}, { key: 'RW', value: 'Rwanda'}, { key: 'RE', value: 'Réunion'}, { key: 'BL', value: 'Saint Barthélemy'}, { key: 'SH', value: 'Saint Helena, Ascension and Tristan da Cunha'}, { key: 'KN', value: 'Saint Kitts and Nevis'}, { key: 'LC', value: 'Saint Lucia'}, { key: 'MF', value: 'Saint Martin (French part)'}, { key: 'PM', value: 'Saint Pierre and Miquelon'}, { key: 'VC', value: 'Saint Vincent and the Grenadines'}, { key: 'WS', value: 'Samoa'}, { key: 'SM', value: 'San Marino'}, { key: 'ST', value: 'Sao Tome and Principe'}, { key: 'SA', value: 'Saudi Arabia'}, { key: 'SN', value: 'Senegal'}, { key: 'RS', value: 'Serbia'}, { key: 'SC', value: 'Seychelles'}, { key: 'SL', value: 'Sierra Leone'}, { key: 'SG', value: 'Singapore'}, { key: 'SX', value: 'Sint Maarten (Dutch part)'}, { key: 'SK', value: 'Slovakia'}, { key: 'SI', value: 'Slovenia'}, { key: 'SB', value: 'Solomon Islands'}, { key: 'SO', value: 'Somalia'}, { key: 'ZA', value: 'South Africa'}, { key: 'GS', value: 'South Georgia and the South Sandwich Islands'}, { key: 'SS', value: 'South Sudan'}, { key: 'ES', value: 'Spain'}, { key: 'LK', value: 'Sri Lanka'}, { key: 'SD', value: 'Sudan (the)'}, { key: 'SR', value: 'Suriname'}, { key: 'SJ', value: 'Svalbard and Jan Mayen'}, { key: 'SE', value: 'Sweden'}, { key: 'CH', value: 'Switzerland'}, { key: 'SY', value: 'Syrian Arab Republic'}, { key: 'TW', value: 'Taiwan (Province of China)'}, { key: 'TJ', value: 'Tajikistan'}, { key: 'TZ', value: 'Tanzania, United Republic of'}, { key: 'TH', value: 'Thailand'}, { key: 'TL', value: 'Timor-Leste'}, { key: 'TG', value: 'Togo'}, { key: 'TK', value: 'Tokelau'}, { key: 'TO', value: 'Tonga'}, { key: 'TT', value: 'Trinidad and Tobago'}, { key: 'TN', value: 'Tunisia'}, { key: 'TR', value: 'Turkey'}, { key: 'TM', value: 'Turkmenistan'}, { key: 'TC', value: 'Turks and Caicos Islands (the)'}, { key: 'TV', value: 'Tuvalu'}, { key: 'UG', value: 'Uganda'}, { key: 'UA', value: 'Ukraine'}, { key: 'AE', value: 'United Arab Emirates (the)'}, { key: 'GB', value: 'United Kingdom of Great Britain and Northern Ireland (the)'}, { key: 'UM', value: 'United States Minor Outlying Islands (the)'}, { key: 'US', value: 'United States of America (the)'}, { key: 'UY', value: 'Uruguay'}, { key: 'UZ', value: 'Uzbekistan'}, { key: 'VU', value: 'Vanuatu'}, { key: 'VE', value: 'Venezuela (Bolivarian Republic of)'}, { key: 'VN', value: 'Viet Nam'}, { key: 'VG', value: 'Virgin Islands (British)'}, { key: 'VI', value: 'Virgin Islands (U.S.)'}, { key: 'WF', value: 'Wallis and Futuna'}, { key: 'EH', value: 'Western Sahara'}, { key: 'YE', value: 'Yemen'}, { key: 'ZM', value: 'Zambia'}, { key: 'ZW', value: 'Zimbabwe'}, { key: 'AX', value: 'Åland Islands'}],
    // tslint:disable-next-line: max-line-length
    el: [{ key: 'LC', value: 'Αγία Λουκία'}, { key: 'BL', value: 'Άγιος Βαρθολομαίος'}, { key: 'MF', value: 'Άγιος Μαρτίνος (Γαλλία)'}, { key: 'SX', value: 'Άγιος Μαρτίνος (Ολλανδία)'}, { key: 'VC', value: 'Άγιος Βικέντιος και Γρεναδίνες'}, { key: 'SM', value: 'Άγιος Μαρίνος'}, { key: 'PM', value: 'Σαιν Πιερ και Μικελόν'}, { key: 'KN', value: 'Άγιος Χριστόφορος και Νέβις'}, { key: 'AZ', value: 'Αζερμπαϊτζάν'}, { key: 'EG', value: 'Αίγυπτος'}, { key: 'ET', value: 'Αιθιοπία'}, { key: 'HT', value: 'Αϊτή'}, { key: 'CI', value: 'Ακτή Ελεφαντοστού'}, { key: 'AL', value: 'Αλβανία'}, { key: 'DZ', value: 'Αλγερία'}, { key: 'AS', value: 'Αμερικανική Σαμόα'}, { key: 'TL', value: 'Ανατολικό Τιμόρ'}, { key: 'AO', value: 'Ανγκόλα'}, { key: 'AI', value: 'Ανγκουίλα'}, { key: 'AD', value: 'Ανδόρρα'}, { key: 'AQ', value: 'Ανταρκτική'}, { key: 'AG', value: 'Αντίγκουα και Μπαρμπούντα'}, { key: 'AR', value: 'Αργεντινή'}, { key: 'AM', value: 'Αρμενία'}, { key: 'AW', value: 'Αρούμπα'}, { key: 'AU', value: 'Αυστραλία'}, { key: 'AT', value: 'Αυστρία'}, { key: 'AF', value: 'Αφγανιστάν'}, { key: 'VU', value: 'Βανουάτου'}, { key: 'VA', value: 'Βατικανό'}, { key: 'BE', value: 'Βέλγιο'}, { key: 'VE', value: 'Βενεζουέλα'}, { key: 'BM', value: 'Βερμούδες'}, { key: 'VN', value: 'Βιετνάμ'}, { key: 'BO', value: 'Βολιβία'}, { key: 'KP', value: 'Βόρεια Κορέα'}, { key: 'BA', value: 'Βοσνία-Ερζεγοβίνη'}, { key: 'BG', value: 'Βουλγαρία'}, { key: 'BR', value: 'Βραζιλία'}, { key: 'IO', value: 'Βρετανικό Έδαφος Ινδικού Ωκεανού'}, { key: 'VG', value: 'Βρετανικές Παρθένοι Νήσοι'}, { key: 'FR', value: 'Γαλλία'}, { key: 'TF', value: 'Γαλλικά Νότια και Ανταρκτικά Εδάφη'}, { key: 'GF', value: 'Γαλλική Γουιάνα'}, { key: 'PF', value: 'Γαλλική Πολυνησία'}, { key: 'DE', value: 'Γερμανία'}, { key: 'GE', value: 'Γεωργία'}, { key: 'GI', value: 'Γιβραλτάρ'}, { key: 'GM', value: 'Γκάμπια'}, { key: 'GA', value: 'Γκαμπόν'}, { key: 'GH', value: 'Γκάνα'}, { key: 'GG', value: 'Γκέρνσεϊ'}, { key: 'GU', value: 'Γκουάμ'}, { key: 'GP', value: 'Γουαδελούπη'}, { key: 'GT', value: 'Γουατεμάλα'}, { key: 'GY', value: 'Γουιάνα'}, { key: 'GN', value: 'Γουινέα'}, { key: 'GW', value: 'Γουινέα-Μπισσάου'}, { key: 'GD', value: 'Γρενάδα'}, { key: 'GL', value: 'Γροιλανδία'}, { key: 'DK', value: 'Δανία'}, { key: 'DO', value: 'Δομινικανή Δημοκρατία'}, { key: 'PS', value: 'Δυτική Όχθη'}, { key: 'EH', value: 'Δυτική Σαχάρα'}, { key: 'SV', value: 'Ελ Σαλβαδόρ'}, { key: 'CH', value: 'Ελβετία'}, { key: 'GR', value: 'Ελλάδα'}, { key: 'ER', value: 'Ερυθραία'}, { key: 'EE', value: 'Εσθονία'}, { key: 'ZM', value: 'Ζάμπια'}, { key: 'ZW', value: 'Ζιμπάμπουε'}, { key: 'AE', value: 'Ηνωμένα Αραβικά Εμιράτα'}, { key: 'US', value: 'Ηνωμένες Πολιτείες Αμερικής'}, { key: 'UM', value: 'Απομακρυσμένες Νησίδες των Ηνωμένων Πολιτειών'}, { key: 'GB', value: 'Ηνωμένο Βασίλειο'}, { key: 'JP', value: 'Ιαπωνία'}, { key: 'IN', value: 'Ινδία'}, { key: 'ID', value: 'Ινδονησία'}, { key: 'JO', value: 'Ιορδανία'}, { key: 'IQ', value: 'Ιράκ'}, { key: 'IR', value: 'Ιράν'}, { key: 'IE', value: 'Ιρλανδία'}, { key: 'GQ', value: 'Ισημερινή Γουινέα'}, { key: 'EC', value: 'Ισημερινός'}, { key: 'IS', value: 'Ισλανδία'}, { key: 'ES', value: 'Ισπανία'}, { key: 'IL', value: 'Ισραήλ'}, { key: 'IT', value: 'Ιταλία'}, { key: 'KZ', value: 'Καζακστάν'}, { key: 'CM', value: 'Καμερούν'}, { key: 'KH', value: 'Καμπότζη'}, { key: 'CA', value: 'Καναδάς'}, { key: 'QA', value: 'Κατάρ'}, { key: 'CF', value: 'Κεντροαφρικανική Δημοκρατία'}, { key: 'KE', value: 'Κένυα'}, { key: 'CN', value: 'Κίνα'}, { key: 'KG', value: 'Κιργιζία'}, { key: 'KI', value: 'Κιριμπάτι'}, { key: 'CG', value: 'Κογκό'}, { key: 'CO', value: 'Κολομβία'}, { key: 'KM', value: 'Κομόρες'}, { key: 'CR', value: 'Κόστα Ρίκα'}, { key: 'CU', value: 'Κούβα'}, { key: 'KW', value: 'Κουβέιτ'}, { key: 'CW', value: 'Κουρασάο'}, { key: 'HR', value: 'Κροατία'}, { key: 'CY', value: 'Κύπρος'}, { key: 'CD', value: 'Λαϊκή Δημοκρατία του Κογκό'}, { key: 'LA', value: 'Λάος'}, { key: 'LS', value: 'Λεσότο'}, { key: 'LV', value: 'Λεττονία'}, { key: 'BY', value: 'Λευκορωσία'}, { key: 'LB', value: 'Λίβανος'}, { key: 'LR', value: 'Λιβερία'}, { key: 'LY', value: 'Λιβύη'}, { key: 'LT', value: 'Λιθουανία'}, { key: 'LI', value: 'Λίχτενσταϊν'}, { key: 'LU', value: 'Λουξεμβούργο'}, { key: 'YT', value: 'Μαγιότ'}, { key: 'MG', value: 'Μαδαγασκάρη'}, { key: 'MO', value: 'Μακάο'}, { key: 'MY', value: 'Μαλαισία'}, { key: 'MW', value: 'Μαλάουι'}, { key: 'MV', value: 'Μαλδίβες'}, { key: 'ML', value: 'Μάλι'}, { key: 'MT', value: 'Μάλτα'}, { key: 'MA', value: 'Μαρόκο'}, { key: 'MQ', value: 'Μαρτινίκα'}, { key: 'MU', value: 'Μαυρίκιος'}, { key: 'MR', value: 'Μαυριτανία'}, { key: 'ME', value: 'Μαυροβούνιο'}, { key: 'MX', value: 'Μεξικό'}, { key: 'MM', value: 'Μιανμάρ'}, { key: 'MN', value: 'Μογγολία'}, { key: 'MZ', value: 'Μοζαμβίκη'}, { key: 'MD', value: 'Μολδαβία'}, { key: 'MC', value: 'Μονακό'}, { key: 'MS', value: 'Μοντσερράτ'}, { key: 'BD', value: 'Μπανγκλαντές'}, { key: 'BB', value: 'Μπαρμπάντος'}, { key: 'BS', value: 'Μπαχάμες'}, { key: 'BH', value: 'Μπαχρέιν'}, { key: 'BZ', value: 'Μπελίζ'}, { key: 'BJ', value: 'Μπενίν'}, { key: 'BQ', value: 'Μποναίρ, Άγιος Ευστάθιος και Σάμπα'}, { key: 'BW', value: 'Μποτσουάνα'}, { key: 'BF', value: 'Μπουρκίνα Φάσο'}, { key: 'BI', value: 'Μπουρούντι'}, { key: 'BT', value: 'Μπουτάν'}, { key: 'BN', value: 'Μπρουνέι'}, { key: 'NA', value: 'Ναμίμπια'}, { key: 'NR', value: 'Ναουρού'}, { key: 'NZ', value: 'Νέα Ζηλανδία'}, { key: 'NC', value: 'Νέα Καληδονία'}, { key: 'NP', value: 'Νεπάλ'}, { key: 'BV', value: 'Μπουβέ'}, { key: 'NF', value: 'Νησί Νόρφολκ'}, { key: 'CX', value: 'Νήσος των Χριστουγέννων'}, { key: 'CC', value: 'Νησιά Κόκος (Keeling)'}, { key: 'AX', value: 'Ώλαντ'}, { key: 'MP', value: 'Βόρειες Μαριάνες Νήσοι'}, { key: 'MH', value: 'Νήσοι Μάρσαλ'}, { key: 'PN', value: 'Νησιά Πίτκερν'}, { key: 'KY', value: 'Κέιμαν Νήσοι'}, { key: 'CK', value: 'Νήσοι Κουκ'}, { key: 'SB', value: 'Νήσοι Σολομώντα'}, { key: 'FO', value: 'Νήσοι Φερόες'}, { key: 'FK', value: 'Νήσοι Φώκλαντ'}, { key: 'IM', value: 'Νήσος Μαν'}, { key: 'HM', value: 'Νήσοι Χερντ και Μακντόναλντ'}, { key: 'NE', value: 'Νίγηρας'}, { key: 'NG', value: 'Νιγηρία'}, { key: 'NI', value: 'Νικαράγουα'}, { key: 'NU', value: 'Νιούε'}, { key: 'NO', value: 'Νορβηγία'}, { key: 'ZA', value: 'Νότια Αφρική'}, { key: 'GS', value: 'Νήσοι Νότια Γεωργία και Νότιες Σάντουιτς'}, { key: 'KR', value: 'Νότια Κορέα'}, { key: 'SS', value: 'Νότιο Σουδάν'}, { key: 'DM', value: 'Δομινίκα'}, { key: 'NL', value: 'Ολλανδία (Κάτω Χώρες)'}, { key: 'AN', value: 'Ολλανδικές Αντίλλες'}, { key: 'OM', value: 'Ομάν'}, { key: 'FM', value: 'Ομόσπονδες Πολιτείες της Μικρονησίας'}, { key: 'HN', value: 'Ονδούρα'}, { key: 'WF', value: 'Ουαλίς και Φουτουνά'}, { key: 'HU', value: 'Ουγγαρία'}, { key: 'UG', value: 'Ουγκάντα'}, { key: 'UZ', value: 'Ουζμπεκιστάν'}, { key: 'UA', value: 'Ουκρανία'}, { key: 'UY', value: 'Ουρουγουάη'}, { key: 'PK', value: 'Πακιστάν'}, { key: 'PW', value: 'Παλάου'}, { key: 'PA', value: 'Παναμάς'}, { key: 'PG', value: 'Παπούα Νέα Γουινέα'}, { key: 'PY', value: 'Παραγουάη'}, { key: 'VI', value: 'Αμερικανικές Παρθένοι Νήσοι'}, { key: 'MK', value: 'Βόρεια Μακεδονία'}, { key: 'PE', value: 'Περού'}, { key: 'PL', value: 'Πολωνία'}, { key: 'PT', value: 'Πορτογαλία'}, { key: 'PR', value: 'Πουέρτο Ρίκο'}, { key: 'CV', value: 'Πράσινο Ακρωτήρι'}, { key: 'RE', value: 'Ρεϊνιόν'}, { key: 'RW', value: 'Ρουάντα'}, { key: 'RO', value: 'Ρουμανία'}, { key: 'RU', value: 'Ρωσία'}, { key: 'WS', value: 'Σαμόα'}, { key: 'SH', value: 'Νήσος Αγίας Ελένης'}, { key: 'ST', value: 'Σάο Τομέ και Πρίνσιπε'}, { key: 'SA', value: 'Σαουδική Αραβία'}, { key: 'SJ', value: 'Σβάλμπαρντ'}, { key: 'SN', value: 'Σενεγάλη'}, { key: 'RS', value: 'Σερβία'}, { key: 'SC', value: 'Σεϋχέλλες'}, { key: 'SL', value: 'Σιέρα Λεόνε'}, { key: 'SG', value: 'Σιγκαπούρη'}, { key: 'SK', value: 'Σλοβακία'}, { key: 'SI', value: 'Σλοβενία'}, { key: 'SO', value: 'Σομαλία'}, { key: 'SZ', value: 'Εσουατίνι'}, { key: 'SD', value: 'Σουδάν'}, { key: 'SE', value: 'Σουηδία'}, { key: 'SR', value: 'Σουρινάμ'}, { key: 'LK', value: 'Σρι Λάνκα'}, { key: 'SY', value: 'Συρία'}, { key: 'TW', value: 'Ταϊβάν'}, { key: 'TH', value: 'Ταϊλάνδη'}, { key: 'TZ', value: 'Τανζανία'}, { key: 'TJ', value: 'Τατζικιστάν'}, { key: 'TC', value: 'Τερκς και Κέικος'}, { key: 'JM', value: 'Τζαμάικα'}, { key: 'JE', value: 'Τζέρσεϊ'}, { key: 'DJ', value: 'Τζιμπουτί'}, { key: 'TO', value: 'Τόγκα'}, { key: 'TG', value: 'Τόγκο'}, { key: 'TK', value: 'Τοκελάου'}, { key: 'TV', value: 'Τουβαλού'}, { key: 'TR', value: 'Τουρκία'}, { key: 'TM', value: 'Τουρκμενιστάν'}, { key: 'TT', value: 'Τρινιντάντ και Τομπάγκο'}, { key: 'TD', value: 'Τσαντ'}, { key: 'CZ', value: 'Τσεχία'}, { key: 'TN', value: 'Τυνησία'}, { key: 'YE', value: 'Υεμένη'}, { key: 'PH', value: 'Φιλιππίνες'}, { key: 'FI', value: 'Φινλανδία'}, { key: 'FJ', value: 'Φίτζι'}, { key: 'CL', value: 'Χιλή'}, { key: 'HK', value: 'Χονγκ Κονγκ'}]
  };

  constructor(@Inject(LOCALE_ID) private locale: keyof CountriesService['countries']) { }

  getAll(): { key: string; value: string; }[] {
    return this.countries[this.locale];
  }
}
