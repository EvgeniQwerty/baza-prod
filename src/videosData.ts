type FilterType = "all" | "clip" | "commercial" | "photo";

interface VideoData {
    folderPath: string;
    name: string;
    org: string;
    type: string;
    typeCode: FilterType;
    year: string;
    imgs: number;
    vimeoLink: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    team: string;
  }

const videosData: VideoData[] = [
    {
      folderPath: "/projects_media/supergoats",
      name: "Суперкозлы",
      org: "Суперкозлы",
      type: "Музыкальный клип",
      typeCode: "clip",
      year: "2023",
      imgs: 9,
      vimeoLink: "https://player.vimeo.com/video/1056798263?h=47645b2617&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      img1: "/projects_media/supergoats/3.avif",
      img2: "/projects_media/supergoats/7.avif",
      img3: "/projects_media/supergoats/5.avif",
      img4: "/projects_media/supergoats/4.avif",
      team: "Written & Director: Михаил Шамриков\nExecutive Producer: Роман Грузман\nScreenwriters by: Павел Чернядьев, Михаил Шамриков, Роман Грузман\nDOP — Александр Артеев\nArt-director — Анна Романова\nGaffer/1st AC — Артемий Мищихин\n2nd AC — Никита Рябенков\nLighting — Эрик Вейдерус\nLighting — Слава Шустов\nLighting — Радион Унгемах\nDrone pilot — Сергей Дудин\nArt-director assistant — Владлена Белецкая\nStylist — Татьяна Скворцова\nStylist assistant — Дарья Городилова\nMake-up artist — Екатерина Рейнсон\n2nd make-up artist — Мария Барляева\nPost Production Producer — Владислав Калашников\nEditor — Михаил Шамриков\nColor/Motion — Владислав Калашников\nCG/VFX — Мехаил Поскрёбышев\nComix artist — Валера Пюре\nSound design — Ivan Alyabev\nBest boy — Саидакмал Тулаганов\nBest boy — Андрей Карпов\nBest boy — Максим Суворов\nBest boy/Backstage — Никита Ивакин\nBackstage photo — Екатерина Лянгасова\nDriver — Евгений Петухов\nDriver — Михаил Волков\nDriver — Никита Антипенок\n",
    },
    {
      folderPath: "/projects_media/psycho",
      name: "Псих",
      org: "Бренд одежды",
      type: "Fashion-ролик",
      typeCode: "commercial",
      year: "2023",
      imgs: 8,
      vimeoLink: "https://player.vimeo.com/video/1056777302?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      img1: "/projects_media/psycho/1.avif",
      img2: "/projects_media/psycho/2.avif",
      img3: "/projects_media/psycho/8.avif",
      img4: "/projects_media/psycho/3.avif",
      team: "DIRECTED by Mikhail Shamrikov\nPRODUCED by Vladislav Kalashnikov\nART DIRECTION by Anna Romanova\nLine producer: Daria Ogoreltseva\nDirector of Photography: Vladislav Kalashnikov\nStyle by ПСИХ\nGaffer: Vladislav Kalashnikov\nMusic by dotbeats\nEdit: Mikhail Shamrikov\nTitles: Mikhail Shamrikov, Anna Romanova\nColor/VFX: Vladislav Kalashnikov\nMODEL: Artem Moshkin, Liza Smirnova\nBackstage: Ilya Urs\n",
    },
    {
      folderPath: "/projects_media/smena",
      name: "Смена",
      org: "Кинотеатр Смена",
      type: "HR-видео",
      typeCode: "commercial",
      year: "2023",
      imgs: 8,
      vimeoLink: "https://player.vimeo.com/video/1056783749?h=e826efbf2a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      img1: "/projects_media/smena/4.avif",
      img2: "/projects_media/smena/2.avif",
      img3: "/projects_media/smena/3.avif",
      img4: "/projects_media/smena/5.avif",
      team: "Продюсер - Влад Калашников\nОператор-постановщик - Александр Артеев\nХудожник по гриму - Алена Игнатьева\nХудожник по костюмам - Дарья Огорельцева, Елизавета Балуева\nГаффер - Артемий Мищихин\nОсветитель - Иван Бабинцев\nМонтаж - Влад Калашников, Александр Артеев\nКомпозитор/SFX - Лев Лерум\nЦвет/Клинап - Александр Артеев\nБэкстейдж фото - Илья Урс\n",
    },
    {
      folderPath: "/projects_media/servicecar",
      name: "Servicecar",
      org: "Servicecar",
      type: "Реклама",
      typeCode: "commercial",
      year: "2023",
      imgs: 4,
      vimeoLink: "https://player.vimeo.com/video/1056778722?h=ac22c915aa&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      img1: "/projects_media/servicecar/1.avif",
      img2: "/projects_media/servicecar/2.avif",
      img3: "/projects_media/servicecar/3.avif",
      img4: "/projects_media/servicecar/4.avif",
      team: "Продюсер - Влад Калашников\nРежиссер - Михаил Шамриков\nОператор-постановщик - Александр Артеев\nЛинейный продюсер - Дарья Огорельцева\nХудожник по гриму - Арина Михеева\nХудожник по костюмам - Дарья Огорельцева\nГаффер - Артемий Мищихин\nМонтаж - Влад Калашников, Александр Артеев\nМоушен-дизайнер/VFX - Станислав Головин\nКомпозитор/SFX - Иван Пестерников\nЦвет/Клинап - Александр Артеев\nБэкстейдж - Слава Шустов, Никита Ивакин\n",
    }
  ];

export default videosData;