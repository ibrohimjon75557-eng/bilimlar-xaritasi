export interface Question {
  id: string;
  questionText: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface SpaceTest {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Boshlang‘ich' | 'O‘rta' | 'Murakkab';
  durationMinutes: number;
  passingScorePercent: number;
  description: string;
  questions: Question[];
}

export interface StudentRecord {
  id: string;
  fullName: string;
  phone: string;
  academyRank: string;
  completedTests: number;
  averageScore: number;
  totalPoints: number;
  lastActive: string;
}

export interface TestAttemptResult {
  id: string;
  testId: string;
  testTitle: string;
  subject: string;
  studentName: string;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: string;
  durationSeconds: number;
}

export const SPACE_TESTS: SpaceTest[] = [
  {
    id: 'astro-101',
    title: 'Quyosh tizimi va Sayyoralar fizikasi',
    subject: 'Astrofizika',
    difficulty: 'Boshlang‘ich',
    durationMinutes: 10,
    passingScorePercent: 60,
    description:
      'Quyosh tizimidagi sayyoralar, ularning yo‘ldoshlari, orbital harakat qonunlari va kosmik masofalar bo‘yicha fundamental sinov.',
    questions: [
      {
        id: 'q1',
        questionText:
          'Quyosh tizimidagi qaysi sayyora eng katta massaga va eng kuchli magnit maydoniga ega?',
        options: [
          { key: 'A', text: 'Saturn' },
          { key: 'B', text: 'Yupiter' },
          { key: 'C', text: 'Neptun' },
          { key: 'D', text: 'Yer' },
        ],
        correctKey: 'B',
        explanation:
          'Yupiter Quyosh tizimidagi eng katta sayyora bo‘lib, uning massasi qolgan barcha sayyoralarning umumiy massasidan 2.5 barobar katta.',
      },
      {
        id: 'q2',
        questionText:
          'Yorug‘lik nuri Quyoshdan Yergacha taxminan qancha vaqtda yetib keladi?',
        options: [
          { key: 'A', text: '1 soniyada' },
          { key: 'B', text: '8 daqiqa 20 soniyada' },
          { key: 'C', text: '24 soatda' },
          { key: 'D', text: '45 daqiqada' },
        ],
        correctKey: 'B',
        explanation:
          'Quyosh va Yer orasidagi masofa ~149.6 million km (1 astronomik birlik). Yorug‘lik tezligi ~300,000 km/s bo‘lgani uchun nur 8 daqiqa 20 soniyada yetib keladi.',
      },
      {
        id: 'q3',
        questionText:
          'Yerning tabiiy yo‘ldoshi Oyda tortishish kuchi Yerdagiga nisbatan necha marta kuchsiz?',
        options: [
          { key: 'A', text: '2 marta' },
          { key: 'B', text: '6 marta' },
          { key: 'C', text: '10 marta' },
          { key: 'D', text: '12 marta' },
        ],
        correctKey: 'B',
        explanation:
          'Oy sirtidagi erkin tushish tezlanishi 1.62 m/s² bo‘lib, Yerning 9.81 m/s² ko‘rsatkichidan taxminan 6 marta kichikdir.',
      },
      {
        id: 'q4',
        questionText:
          'Qaysi sayyora o‘z orbitasi tekisligiga nisbatan deyarli yonboshlab (98° og‘ish bilan) aylanadi?',
        options: [
          { key: 'A', text: 'Mars' },
          { key: 'B', text: 'Venera' },
          { key: 'C', text: 'Uran' },
          { key: 'D', text: 'Merkuriy' },
        ],
        correctKey: 'C',
        explanation:
          'Uranning aylanish o‘qi 97.77 gradusga og‘gan bo‘lib, u Quyosh atrofida xuddi dumalab ketayotgan shar kabi harakatlanadi.',
      },
      {
        id: 'q5',
        questionText:
          'Birinchi kosmik tezlik (Yer orbitasiga chiqish tezligi) necha km/s ga teng?',
        options: [
          { key: 'A', text: '4.5 km/s' },
          { key: 'B', text: '7.9 km/s' },
          { key: 'C', text: '11.2 km/s' },
          { key: 'D', text: '16.7 km/s' },
        ],
        correctKey: 'B',
        explanation:
          '7.9 km/s — jism Yerga qulab tushmasdan, uning atrofida doiraviy orbita bo‘ylab sun’iy yo‘ldosh sifatida aylanishi uchun zarur bo‘lgan birinchi kosmik tezlikdir.',
      },
    ],
  },
  {
    id: 'math-orbital-202',
    title: 'Orbital Mexanika va Kosmik Matematika',
    subject: 'Matematika va Fizika',
    difficulty: 'O‘rta',
    durationMinutes: 12,
    passingScorePercent: 60,
    description:
      'Kepler qonunlari, raketa tezlanishi, orbital davr hisob-kitoblari hamda kosmik navigatsiya tenglamalari bo‘yicha amaliy test.',
    questions: [
      {
        id: 'm1',
        questionText:
          'Keplerning birinchi qonuniga ko‘ra, barcha sayyoralar Quyosh atrofida qanday shaklga ega orbita bo‘ylab harakatlanadi?',
        options: [
          { key: 'A', text: 'Ideal aylana' },
          { key: 'B', text: 'Ellips' },
          { key: 'C', text: 'Parabola' },
          { key: 'D', text: 'Giperbola' },
        ],
        correctKey: 'B',
        explanation:
          'Har bir sayyora fokuslaridan birida Quyosh joylashgan ellips bo‘ylab harakatlanadi.',
      },
      {
        id: 'm2',
        questionText:
          'Agar sun’iy yo‘ldosh Yer sirtidan 600 km balandlikda 7.56 km/s tezlik bilan uchayotgan bo‘lsa, u 100 soniyada qancha masofani bosib o‘tadi?',
        options: [
          { key: 'A', text: '75.6 km' },
          { key: 'B', text: '756 km' },
          { key: 'C', text: '7560 km' },
          { key: 'D', text: '151.2 km' },
        ],
        correctKey: 'B',
        explanation:
          'Masofa S = v × t = 7.56 km/s × 100 s = 756 km.',
      },
      {
        id: 'm3',
        questionText:
          'Yerning tortishish maydonini butunlay tark etib, Quyosh tizimi bo‘ylab parvoz qilish uchun zarur bo‘lgan ikkinchi kosmik tezlik qancha?',
        options: [
          { key: 'A', text: '7.9 km/s' },
          { key: 'B', text: '9.8 km/s' },
          { key: 'C', text: '11.2 km/s' },
          { key: 'D', text: '29.8 km/s' },
        ],
        correctKey: 'C',
        explanation:
          'Ikkinchi kosmik tezlik (parabolik tezlik) Yer uchun 11.2 km/s ga teng.',
      },
      {
        id: 'm4',
        questionText:
          'Siolkovskiy formulasi raketa tezligining qaysi kattalikka bog‘liqligini ifodalaydi?',
        options: [
          { key: 'A', text: 'Faqat havo qarshiligiga' },
          { key: 'B', text: 'Yoqilg‘i gazlarining chiqish tezligi va boshlang‘ich/oxirgi massa nisbatiga' },
          { key: 'C', text: 'Quyosh shamoli bosimiga' },
          { key: 'D', text: 'Sayyoraning magnit qutblariga' },
        ],
        correctKey: 'B',
        explanation:
          'Siolkovskiy tenglamasi: Δv = v_e * ln(m_0 / m_f), ya’ni reaktiv oqim tezligi va raketaning boshlang‘ich hamda yakuniy massalari nisbati logarifmiga bog‘liq.',
      },
      {
        id: 'm5',
        questionText:
          'Geostatsionar orbitadagi aloqa yo‘ldoshining Yer atrofida aylanish davri necha soatga teng?',
        options: [
          { key: 'A', text: '1.5 soat' },
          { key: 'B', text: '12 soat' },
          { key: 'C', text: '24 soat' },
          { key: 'D', text: '48 soat' },
        ],
        correctKey: 'C',
        explanation:
          'Geostatsionar sun’iy yo‘ldosh Yerning o‘z o‘qi atrofida aylanish davriga (taxminan 24 soat) teng davr bilan aylanadi va osmonning bitta nuqtasida muallaq ko‘rinadi.',
      },
    ],
  },
  {
    id: 'deep-space-303',
    title: 'Chuqur Kosmos: Galaktikalar va Nebula Tizimlari',
    subject: 'Kosmologiya',
    difficulty: 'Murakkab',
    durationMinutes: 15,
    passingScorePercent: 60,
    description:
      'Somon yo‘li galaktikasi, yulduzlarning tug‘ilish o‘choqlari bo‘lgan nebulalar, neytron yulduzlar va ekzosayyoralar tahlili.',
    questions: [
      {
        id: 'd1',
        questionText:
          'Somon yo‘li (Milky Way) galaktikasiga eng yaqin joylashgan yirik spiral galaktika qaysi?',
        options: [
          { key: 'A', text: 'Sombrero galaktikasi' },
          { key: 'B', text: 'Andromeda (M31)' },
          { key: 'C', text: 'Uchburchak galaktikasi' },
          { key: 'D', text: 'Katta Magellan buluti' },
        ],
        correctKey: 'B',
        explanation:
          'Andromeda galaktikasi (M31) bizdan 2.5 million yorug‘lik yili uzoqlikda joylashgan eng yaqin yirik spiral galaktikadir.',
      },
      {
        id: 'd2',
        questionText:
          'Kosmosdagi "Nebula" (Tumanlik) asosan nimalardan tashkil topgan bo‘ladi?',
        options: [
          { key: 'A', text: 'Muzlagan asteroidlar to‘dasidan' },
          { key: 'B', text: 'Ionlashgan gazlar (vodorod, geliy) va kosmik chang bulutlaridan' },
          { key: 'C', text: 'Faqat qora tuynuklardan' },
          { key: 'D', text: 'Suyuq metall tomchilaridan' },
        ],
        correctKey: 'B',
        explanation:
          'Nebulalar — vodorod, geliy va plazma hamda kosmik changdan iborat ulkan bulutlar bo‘lib, yangi yulduzlar aynan shu yerda shakllanadi.',
      },
      {
        id: 'd3',
        questionText:
          'Quyoshdan tashqaridagi eng yaqin yulduz — Proksima Sentavr Yerdan necha yorug‘lik yili masofada joylashgan?',
        options: [
          { key: 'A', text: '1.2 yorug‘lik yili' },
          { key: 'B', text: '4.24 yorug‘lik yili' },
          { key: 'C', text: '10.5 yorug‘lik yili' },
          { key: 'D', text: '25 yorug‘lik yili' },
        ],
        correctKey: 'B',
        explanation:
          'Proksima Sentavr qizil mitti yulduz bo‘lib, Quyosh tizimidan 4.24 yorug‘lik yili uzoqlikda joylashgan.',
      },
      {
        id: 'd4',
        questionText:
          'Katta massali yulduz o‘z umrining oxirida portlab sochilib ketishi fanda nima deb ataladi?',
        options: [
          { key: 'A', text: 'Supernova (O‘ta yangi yulduz chaqnashi)' },
          { key: 'B', text: 'Protostar bosqichi' },
          { key: 'C', text: 'Kvazar effekti' },
          { key: 'D', text: 'Quyosh toji ajralishi' },
        ],
        correctKey: 'A',
        explanation:
          'Supernova — yulduz evolyutsiyasining yakuniy bosqichidagi ulkan energetik portlash bo‘lib, butun galaktikadek yorqin nur sochishi mumkin.',
      },
      {
        id: 'd5',
        questionText:
          'James Webb kosmik teleskopi koinotni asosan qaysi elektromagnit to‘lqin diapazonida kuzatadi?',
        options: [
          { key: 'A', text: 'Rentgen nurlarida' },
          { key: 'B', text: 'Infraqizil nurlarda' },
          { key: 'C', text: 'Ultrabinarsha nurlarda' },
          { key: 'D', text: 'Gamma nurlarida' },
        ],
        correctKey: 'B',
        explanation:
          'James Webb teleskopi infraqizil spektrda ishlaydi, bu unga kosmik chang bulutlari ortidagi ilk galaktikalarni ko‘rish imkonini beradi.',
      },
    ],
  },
  {
    id: 'ai-space-robotics-404',
    title: 'Kosmik Robototexnika va Sun’iy Intellekt',
    subject: 'Muhandislik va IT',
    difficulty: 'O‘rta',
    durationMinutes: 10,
    passingScorePercent: 60,
    description:
      'Mars roverlari, avtonom navigatsiya algoritmlari, fazoviy datchiklar va telemetriya tizimlari bo‘yicha muhandislik sinovi.',
    questions: [
      {
        id: 'r1',
        questionText:
          'Mars sirtidagi roverlar nima sababdan Yerdan real-vaqt rejimida (joystik orqali) boshqarilmaydi?',
        options: [
          { key: 'A', text: 'Marsda elektr energiyasi yo‘qligi uchun' },
          { key: 'B', text: 'Radio signal Yerdan Marsgacha 4 daqiqadan 24 daqiqagacha kechikib borishi sababli' },
          { key: 'C', text: 'Roverlarda kamera mavjud emasligi sababli' },
          { key: 'D', text: 'Mars atmosferasi radioto‘lqinlarni o‘tkazmasligi sababli' },
        ],
        correctKey: 'B',
        explanation:
          'Yer va Mars orasidagi katta masofa tufayli signal bir tomonga 4–24 daqiqa yuradi, shu bois roverlar avtonom AI navigatsiyadan foydalanadi.',
      },
      {
        id: 'r2',
        questionText:
          '2021-yilda Mars atmosferasida ilk bor boshqariladigan parvozni amalga oshirgan mini-vertolyot qanday nomlanadi?',
        options: [
          { key: 'A', text: 'Voyager-2' },
          { key: 'B', text: 'Ingenuity' },
          { key: 'C', text: 'Cassini' },
          { key: 'D', text: 'Pathfinder' },
        ],
        correctKey: 'B',
        explanation:
          'NASAning Ingenuity dron-vertolyoti Perseverance roveri bilan birga Marsga yetkazilib, o‘zga sayyoradagi ilk motorli parvozni bajardi.',
      },
      {
        id: 'r3',
        questionText:
          'Uzoq kosmosda Quyosh nuri yetarli bo‘lmaganda kosmik apparatlar qanday energiya manbasidan foydalanadi?',
        options: [
          { key: 'A', text: 'Shamol generatorlaridan' },
          { key: 'B', text: 'Radioizotopli termoelektrik generatorlardan (RTG)' },
          { key: 'C', text: 'Ko‘mir yoqilg‘isidan' },
          { key: 'D', text: 'Oddiy ishqoriy batareyalardan' },
        ],
        correctKey: 'B',
        explanation:
          'RTG qurilmalari radioaktiv izotop (masalan, Plutoniy-238) parchalanishidan ajraladigan issiqlikni elektr tokiga aylantiradi.',
      },
      {
        id: 'r4',
        questionText:
          'Kosmik kemaning fazodagi burchak holatini (oriyentatsiyasini) yoqilg‘i sarflamasdan o‘zgartirishda qaysi mexanizm ishlatiladi?',
        options: [
          { key: 'A', text: 'Parashyut tizimi' },
          { key: 'B', text: 'Girodin (Reaksiya g‘ildiraklari / Reaction Wheels)' },
          { key: 'C', text: 'Aero-tormoz qanotlari' },
          { key: 'D', text: 'Langar zanjiri' },
        ],
        correctKey: 'B',
        explanation:
          'Impuls momentining saqlanish qonuniga asosan, ichki mahovik-g‘ildiraklarni aylantirish orqali kema korpusini teskari yo‘nalishda burish mumkin.',
      },
      {
        id: 'r5',
        questionText:
          'O‘zbekistonning buyuk astronomi Mirzo Ulug‘bek tomonidan Samarqandda tuzilgan mashhur yulduzlar jadvali qanday ataladi?',
        options: [
          { key: 'A', text: 'Ziji jadidi Ko‘ragoniy' },
          { key: 'B', text: 'Al-Jabr val-Muqobala' },
          { key: 'C', text: 'Qonuni Mas’udiy' },
          { key: 'D', text: 'Kitob surat al-arz' },
        ],
        correctKey: 'A',
        explanation:
          'Mirzo Ulug‘bek rasadxonasida 1018 ta yulduzning aniq koordinatalari jamlangan "Ziji jadidi Ko‘ragoniy" asari yaratilgan.',
      },
    ],
  },
];

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'st-1',
    fullName: 'Sardorbek Alimov',
    phone: '+998 90 345 12 88',
    academyRank: 'Komandir Kadet',
    completedTests: 14,
    averageScore: 96,
    totalPoints: 1340,
    lastActive: 'Bugun, 14:20',
  },
  {
    id: 'st-2',
    fullName: 'Madinabonu Karimova',
    phone: '+998 93 512 44 09',
    academyRank: 'Bosh Astro-Tahlilchi',
    completedTests: 12,
    averageScore: 92,
    totalPoints: 1180,
    lastActive: 'Bugun, 12:05',
  },
  {
    id: 'st-3',
    fullName: 'Javohir Tursunov',
    phone: '+998 99 801 77 32',
    academyRank: 'Orbital Muhandis',
    completedTests: 11,
    averageScore: 88,
    totalPoints: 1045,
    lastActive: 'Kecha, 19:40',
  },
  {
    id: 'st-4',
    fullName: 'Zilola Rustamova',
    phone: '+998 97 440 19 65',
    academyRank: 'Yulduzlar Tadqiqotchisi',
    completedTests: 9,
    averageScore: 84,
    totalPoints: 890,
    lastActive: 'Kecha, 16:15',
  },
  {
    id: 'st-5',
    fullName: 'Bekzod Nurmatov',
    phone: '+998 91 209 63 11',
    academyRank: 'Fazoviy Uchuvchi',
    completedTests: 8,
    averageScore: 79,
    totalPoints: 760,
    lastActive: '2 kun oldin',
  },
  {
    id: 'st-6',
    fullName: 'Sevinch Xolmatova',
    phone: '+998 94 618 90 24',
    academyRank: 'Yosh Astronom',
    completedTests: 6,
    averageScore: 75,
    totalPoints: 580,
    lastActive: '3 kun oldin',
  },
];

export const INITIAL_RESULTS: TestAttemptResult[] = [
  {
    id: 'res-101',
    testId: 'astro-101',
    testTitle: 'Quyosh tizimi va Sayyoralar fizikasi',
    subject: 'Astrofizika',
    studentName: 'Sardorbek Alimov',
    scorePercent: 100,
    correctCount: 5,
    totalQuestions: 5,
    passed: true,
    completedAt: 'Bugun, 14:20',
    durationSeconds: 215,
  },
  {
    id: 'res-102',
    testId: 'deep-space-303',
    testTitle: 'Chuqur Kosmos: Galaktikalar va Nebula Tizimlari',
    subject: 'Kosmologiya',
    studentName: 'Madinabonu Karimova',
    scorePercent: 80,
    correctCount: 4,
    totalQuestions: 5,
    passed: true,
    completedAt: 'Bugun, 12:05',
    durationSeconds: 310,
  },
  {
    id: 'res-103',
    testId: 'math-orbital-202',
    testTitle: 'Orbital Mexanika va Kosmik Matematika',
    subject: 'Matematika va Fizika',
    studentName: 'Javohir Tursunov',
    scorePercent: 80,
    correctCount: 4,
    totalQuestions: 5,
    passed: true,
    completedAt: 'Kecha, 19:40',
    durationSeconds: 280,
  },
  {
    id: 'res-104',
    testId: 'ai-space-robotics-404',
    testTitle: 'Kosmik Robototexnika va Sun’iy Intellekt',
    subject: 'Muhandislik va IT',
    studentName: 'Bekzod Nurmatov',
    scorePercent: 40,
    correctCount: 2,
    totalQuestions: 5,
    passed: false,
    completedAt: '2 kun oldin',
    durationSeconds: 195,
  },
];
