/* 来源、时间、范围与口径随记录保存；不同统计对象不作连续趋势。 */
window.WETLAND_DATA = {
  sources: {
    cctv: { publisher: '央视新闻 · 郎溪县融媒体中心', title: '安徽郎溪：白天鹅“恋上”南漪湖 候鸟规模创新高', date: '2024-12-04', url: 'https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=165838781481423142' },
    cnr: { publisher: '央广网（腾讯新闻转载）', title: '安徽郎溪：史上罕见！南漪湖畔出现大规模天鹅迁徙', date: '2024-11-29', url: 'https://view.inews.qq.com/a/20241129A03HAE00' },
    peak: { publisher: '大皖新闻', title: '绿水青山鸟飞回｜宣城南漪湖变身“天鹅湖”', date: '2025-01-04', url: 'http://m.ahwang.cn/anhui/20250104/2796104.html' },
    arrival: { publisher: '新安晚报', title: '郎溪南漪湖迎来大批迁徙候鸟', date: '2025-11-22', url: 'http://epaper.ahwang.cn/xawb/20251122/html/content_20251122003003.htm' },
    gov: { publisher: '宣城市人民政府 · 郎溪发布', title: '【郎溪县】南漪湖迎来候鸟迁徙高峰', date: '2025-11-24', url: 'https://www.xuancheng.gov.cn/OpennessContent/show/3632462.html' },
    guard: { publisher: '国家林业和草原局转载人民网', title: '安徽宣城：接力守护候鸟记', date: '2025-02-20', url: 'https://www.forestry.gov.cn/c/www/dzbhdt/610682.jhtml' },
    shield: { publisher: '安徽省林业局转载安徽日报', title: '构建“万千生灵”守护屏障', date: '2025-05-25', url: 'https://lyj.ah.gov.cn/ztzl/mtkly/40752220.html' },
    wetland: { publisher: '人民网安徽频道', title: '宣城市湿地资源保护取得显著成效', date: '2025-11-24', url: 'http://ah.people.com.cn/BIG5/n2/2025/1124/c375162-41420526.html' },
    wetlandReport: { publisher: '安徽环境新闻网转载宣城日报', title: '宣城湿地资源保护取得显著成效', date: '2025-11-26', url: 'https://huanjing.ahwang.cn/hjyixian/20251126/49861.html' },
    wanling: { publisher: '宣城日报', title: '宛陵湖畔，生态观鸟', date: '2024-05-14', url: 'http://epaperpc.newsxc.com/epaper/read.do?m=i&iid=5390&eid=23506&sid=169880&idate=1_2024-05-14' },
    briefing: { publisher: '宣城市生态环境局', title: '2023年5月二季度新闻发布会发布实录', date: '2023-05-30', url: 'https://sthjj.xuancheng.gov.cn/OpennessContent/show/2746075.html' },
    alligator: { publisher: '安徽省林业局转载宣城日报', title: '生态修复让“活化石”重归自然', date: '2025-08-23', url: 'https://lyj.ah.gov.cn/ztzl/mtkly/40765139.html' },
    patrol: { publisher: '宣城市林业局', title: '【郎溪县】爱鸟护鸟推进鸟类保护工作', date: '2026-01-29', url: 'https://lyj.xuancheng.gov.cn/News/show/1696912.html' },
    azhi: { publisher: '极目新闻转载大皖新闻', title: '“阿芷”来到了南漪湖', date: '2026-01-27', url: 'https://www.ctdsb.net/c1716_202601/2649791.html' },
    winter: { publisher: '人民网安徽频道', title: '宣城郎溪：候鸟栖湿地 生态绘新卷', date: '2026-01-31', url: 'https://ah.people.com.cn/n2/2026/0131/c227131-41489288.html' },
    province: { publisher: '安徽省林业局', title: '安徽组织开展2022—2023年冬季水鸟同步调查', date: '2023-02-02', url: 'https://lyj.ah.gov.cn/ahlq/ysdzwzy/40629619.html' },
    water2019: { publisher:'宣城市生态环境局',title:'《南漪湖水污染达标治理工作方案》政策解读',date:'2019-09-30',url:'https://sthjj.xuancheng.gov.cn/OpennessContent/show/1544801.html' },
    water2021: { publisher:'宣城市生态环境局',title:'2021年宣城市生态环境状况公报（第8—9页）',date:'2021年度公报',url:'https://file.xuancheng.gov.cn/54/202307/20230703e40e25a88310444e83c42ee20982c64a.pdf' },
    water2026: { publisher:'安徽省创业服务云平台转载宣州区人民政府',title:'宣州区扎实推进南漪湖流域综合治理筑牢生态屏障',date:'2026-04-20',url:'https://www.ahcy.gov.cn/foundPolicy/policyFileDetail.html?id=e91fa2c9e0b6485a87b729a36af79570' }
  },
  observations: [
    { label:'2024年11月27日',sub:'首批抵达天鹅 · 单物种记录',value:500,display:'约 500 只天鹅',group:'observed',unit:'只',note:'央广网记录南漪湖约500只天鹅抵达；单物种数量，与候鸟总量分别标注。',source:'cnr' },
    { label:'2024年12月报道', sub:'当日观测 · 南漪湖飞鲤镇', value:3000, display:'超过 3,000 只', group:'observed', unit:'只', note:'现场观测总量，2024年12月4日报道。', source:'cctv' },
    { label:'2024—2025越冬季', sub:'单次最高 · 南漪湖郎溪片区', value:30000, display:'超过 30,000 只', group:'observed', unit:'只', note:'巡护员虞宗贤记录的越冬季单次最高值，2025年1月4日报道。', source:'peak' },
    { label:'2025年11月预判', sub:'预计越冬高峰 · 南漪湖', value:20000, low:10000, display:'预计 10,000—20,000 只', group:'forecast', unit:'只', note:'2025年11月24日报道，预判未来半个月至一个月的高峰数量。', source:'gov' }
  ],
  species: [
    {label:'东方白鹳',group:'一级保护',place:'南漪湖',note:'2024年，东方白鹳等大批候鸟来到南漪湖越冬。',source:'guard'},
    {label:'中华秋沙鸭',group:'一级保护',place:'宣城市域',note:'宣城市野生动物资源记录中的国家一级保护鸟类。',source:'guard'},
    {label:'小天鹅',group:'二级保护',place:'南漪湖',note:'2024年11月底至12月初，南漪湖的报道记录了约500只小天鹅。',source:'cctv'},
    {label:'鸿雁',group:'二级保护',place:'南漪湖',note:'2024—2025越冬季，与天鹅、野鸭一同出现在湖区观测记录中。',source:'peak'},
    {label:'豆雁',group:'二级保护',place:'南漪湖',note:'2025年11月，成群豆雁抵达南漪湖。',source:'gov'},
    {label:'鸳鸯',group:'二级保护',place:'宣城市域',note:'宣城市野生动物资源记录中的国家二级保护鸟类。',source:'guard'},
    ...['白鹭','池鹭','夜鹭','黑水鸡','翠鸟','白头鹎','金翅雀'].map(label=>({label,group:'其他记录',place:'宛陵湖',note:'见于《宛陵湖畔，生态观鸟》的鸟类记录，2024年5月14日刊发。',source:'wanling'}))
  ],
  water: [
    {label:'2019年5月',sub:'南漪湖 · 单月总磷浓度',value:0.16,display:'0.160 毫克/升',unit:'毫克/升',note:'2019年2、3、4、5月总磷浓度依次为0.080、0.065、0.060、0.160毫克/升。0.160为5月值。',source:'water2019'},
    {label:'2021年',sub:'全湖 · 年度水质评价',value:null,display:'总体良好',unit:'定性评价',qualitative:'综合营养状态指数 47.5 · 中营养',note:'年度公报记录南漪湖水质总体良好、综合营养状态指数47.5、呈中营养状态；未从月度曲线估算全年总磷均值。',source:'water2021'},
    {label:'2026年1—3月',sub:'西湖湖心 · 季度总磷均值',value:0.039,display:'0.039 毫克/升',unit:'毫克/升',note:'西湖湖心总磷浓度季度均值0.039毫克/升，同比下降15.22%；同比基期为上一年同期。',source:'water2026'}
  ],
  restorationCompare: [
    {label:'水质 · 总磷浓度',before:'0.160 毫克/升',beforeContext:'2019年5月 · 南漪湖单月值',beforeSource:'water2019',after:'0.039 毫克/升',afterContext:'2026年1—3月 · 西湖湖心季度均值',source:'water2026',display:'单月与季度记录',note:'两端分别为单月记录与特定断面季度均值。2026年报道的15.22%是同比降幅。'},
    {label:'养殖围网',before:'入湖河口设置养殖围网',beforeContext:'原养殖设施',beforeSource:'briefing',after:'累计拆除 62,000 余米',afterContext:'截至2023年5月报道',source:'briefing',display:'拆除62,000余米',note:'2023年5月新闻发布会记载，南漪湖累计拆除养殖围网62000余米。'},
    {label:'围湖养殖子埂',before:'围湖养殖子埂分割水面',beforeContext:'原养殖设施',beforeSource:'briefing',after:'破除 50 处',afterContext:'截至2023年5月报道',source:'briefing',display:'破除50处',note:'沙河河口另实施破埂作业，退地还湿1172亩。'},
    {label:'湿地生态修复',before:'基期面积未列数值',beforeContext:'现有材料未给出同口径基期面积',beforeSource:'wetland',after:'修复 1,239 公顷',afterContext:'南漪湖省级重要湿地 · 2025年报道',source:'wetland',display:'修复1,239公顷',note:'扬子鳄保护区另修复263公顷；南漪湖配套生境再造9600平方米。基期缺值不按零计算。'},
    {label:'巡护与管护',before:'巡护值守 7,394 人次',beforeContext:'2022年 · 宣城市域',beforeSource:'briefing',after:'专职网格巡护 107 名',afterContext:'2025年报道 · 宣城市域',source:'shield',display:'人次与人数分别记录',note:'人次为活动参与量，人数为配置规模。飞鲤镇另配7个监控探头和2名专业巡护人员，详见图6。'}
  ],
  area: {
    restoration: [
      {label:'南漪湖省级重要湿地',sub:'湿地生态修复',value:1239,display:'1,239 公顷',unit:'公顷',note:'省级重要湿地生态修复面积，2025年11月报道。',source:'wetland'},
      {label:'扬子鳄保护区',sub:'湿地生态修复',value:263,display:'263 公顷',unit:'公顷',note:'国家级自然保护区湿地生态修复面积，2025年11月报道。',source:'wetland'},
      {label:'南漪湖入湖口项目',sub:'原文1,270亩 · 换算后',value:1270/15,display:'约 84.7 公顷',unit:'公顷',note:'入湖口湿地治理修复1,270亩，按15亩＝1公顷换算。',source:'gov'}
    ],
    site: [
      {label:'南漪湖',sub:'湖泊面积 · 2025年报道',value:18900,display:'18,900 公顷',unit:'公顷',note:'安徽日报记载湖泊面积189平方公里，换算为18,900公顷。',source:'shield'},
      {label:'宛陵湖湿地公园',sub:'公园占地 · 2024年报道',value:280,display:'280 公顷',unit:'公顷',note:'宣城日报记载公园占地2.8平方公里，换算为280公顷。',source:'wanling'}
    ]
  },
  restoration: [
    {label:'拆除养殖围网',display:'62,000 余米',sub:'南漪湖 · 截至2023年5月报道',note:'围网移除后，水域重新连通，鸟类拥有了更开阔的活动空间。',source:'briefing'},
    {label:'破除围湖养殖子埂',display:'50 处',sub:'南漪湖 · 截至2023年5月报道',note:'破除围湖养殖子埂，让被分割的水系恢复连通。',source:'briefing'},
    {label:'退地还湿',display:'1,172 亩',sub:'南漪湖沙河河口 · 2023年报道',note:'沙河河口实施破埂作业与退地还湿，恢复湿地空间。',source:'briefing'},
    {label:'生境再造',display:'9,600 平方米',sub:'南漪湖 · 2025年5月报道',note:'与湿地生态修复相配套的生境再造工程。',source:'shield'},
    {label:'生态修复区新增鸟类',display:'16 种',sub:'扬子鳄保护区 · 2025年8月报道',note:'扬子鳄保护区生态修复区的新增鸟类记录，呈现出栖息地恢复后的生物多样性。',source:'alligator'}
  ],
  investment: [
    {label:'南漪湖入湖口项目',sub:'项目总投资 · 2025年11月报道',value:8800,display:'8,800 万元',unit:'万元',note:'入湖口生态湿地项目总投资，采用2025年11月24日市政府报道口径。',source:'gov'},
    {label:'南漪湖、桐汭等省级湿地',sub:'省级财政支持 · 2025年报道',value:722,display:'722 万元',unit:'万元',note:'覆盖多处省级湿地，用于无人机、视频监控与巡护服务。',source:'wetlandReport'},
    {label:'飞鲤镇候鸟保护设施',sub:'设施与人员投入 · 2024年报道',value:30,display:'30 万元',unit:'万元',note:'用于安装监控探头和聘请巡护人员。',source:'cctv'}
  ],
  patrol: {
    people:[
      {label:'全市专职网格巡护',sub:'宣城市域 · 2025年报道',value:107,display:'107 名',unit:'名',note:'宣城市自然保护地的专职网格巡护人员。',source:'shield'},
      {label:'飞鲤镇专业巡护',sub:'南漪湖飞鲤镇 · 2024年报道',value:2,display:'2 名',unit:'名',note:'飞鲤镇配置的专业巡护人员，每周开展巡护。',source:'cnr'}
    ],
    equipment:[
      {label:'360°监控探头',sub:'南漪湖飞鲤镇 · 2024年报道',value:7,display:'7 个',unit:'个',note:'用于湖区候鸟监测，报道指24小时监护。',source:'cnr'},
      {label:'退水涵闸',sub:'南漪湖入湖口 · 2025年报道',value:6,display:'6 座',unit:'座',note:'南漪湖入湖口水环境工程的退水设施。',source:'shield'},
      {label:'放水涵闸',sub:'南漪湖入湖口 · 2025年报道',value:4,display:'4 座',unit:'座',note:'水环境工程设施。',source:'shield'}
    ],
    action:[
      {label:'护林员巡护',sub:'郎溪县 · 2025年12月起',value:400,display:'400 余次',unit:'次',note:'2025年12月至2026年1月29日报道时的累计巡护次数。',source:'patrol'},
      {label:'专班巡护督导',sub:'郎溪县 · 2025年12月起',value:8,display:'8 次',unit:'次',note:'2025年12月至2026年1月29日报道时的专班督导记录。',source:'patrol'},
      {label:'联合公安执法',sub:'郎溪县 · 2025年12月起',value:1,display:'1 次',unit:'次',note:'同期报道还记载收缴捕鸟（兽）夹（套）13件（套）。',source:'patrol'}
    ]
  },
  timeline: [
    {date:'2024.11.27',season:'2024—2025',title:'天鹅抵达',text:'约500只天鹅抵达南漪湖，湖畔迎来越冬的白色身影。',source:'cnr'},
    {date:'2024.12.04',season:'2024—2025',title:'湖区聚集',text:'报道中的现场观测总量超过3000只，其中小天鹅约500只。',source:'cctv'},
    {date:'2025.01.04 报道',season:'2024—2025',title:'越冬季的高峰记录',text:'巡护员虞宗贤介绍，这一越冬季的单次观测数量最多超过3万只。',source:'peak'},
    {date:'2025.11.20',season:'2025—2026',title:'新一季候鸟抵达',text:'新安晚报记录，当日傍晚大批候鸟在南漪湖栖息。',source:'arrival'},
    {date:'2025.12.20',season:'2025—2026',title:'豆雁“阿芷”停在南漪湖',text:'佩戴卫星颈环的豆雁“阿芷”由霍邱转向，抵达南漪湖越冬。',source:'azhi'},
    {date:'2026.01.31 报道',season:'2025—2026',title:'湿地上的越冬时光',text:'人民网记录天鹅、豆雁在当地栖息，冬日湖畔依然鸟影成群。',source:'winter'}
  ]
};

/* Species reference photographs; observation locality is recorded separately. */
window.WETLAND_DATA.speciesPhotos = {
  "东方白鹳": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/chart-oriental-stork.webp",
    "author": "桑新华",
    "url": "https://tsgw.taian.gov.cn/art/2026/1/21/art_363607_10320277.html",
    "license": null,
    "licenseUrl": null,
    "position": "center center"
  },
  "中华秋沙鸭": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/bird-scaly-sided-merganser.webp",
    "author": "Rufus46",
    "url": "https://commons.wikimedia.org/wiki/File:Schuppensaeger_Mergus_squamatus_Zoo_Augsburg-02.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "position": "center center"
  },
  "小天鹅": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/chart-bewicks-swan.webp",
    "author": "belvedere04",
    "url": "https://commons.wikimedia.org/wiki/File:Cygnus_columbianus_bewickii_344072989.jpg",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "position": "center center"
  },
  "鸿雁": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/chart-swan-goose.webp",
    "author": "grihahasanov",
    "url": "https://commons.wikimedia.org/wiki/File:Anser_cygnoides,_Ozero_Stepnoye,_Ivolginskiy,_Buryatia_Republic,_Russia_1_(cropped).jpg",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "position": "center center"
  },
  "豆雁": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/bird-bean-goose.webp",
    "author": "agulivanov",
    "url": "https://commons.wikimedia.org/wiki/File:Anser_fabalis_fabalis,_Kurortny_District,_St_Petersburg,_Russia_1.jpg",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "position": "center center"
  },
  "鸳鸯": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/chart-mandarin-duck.webp",
    "author": "刘兆瑞",
    "url": "https://tsgw.taian.gov.cn/art/2026/1/21/art_363607_10320272.html",
    "license": null,
    "licenseUrl": null,
    "position": "center center"
  },
  "白鹭": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/chart-little-egret.webp",
    "author": "Hobbyfotowiki",
    "url": "https://commons.wikimedia.org/wiki/File:Little_egret_(Egretta_garzetta)_in_flight.jpg",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "position": "center center"
  },
  "池鹭": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/bird-chinese-pond-heron.webp",
    "author": "JJ Harrison  ( https://www.jjharrison.com.au/ )",
    "url": "https://commons.wikimedia.org/wiki/File:Ardeola_bacchus_winter_plumage_-_Laem_Phak_Bia.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "position": "center center"
  },
  "夜鹭": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/bird-night-heron.webp",
    "author": "Frank Schulenburg",
    "url": "https://commons.wikimedia.org/wiki/File:Nycticorax_nycticorax_at_Las_Gallinas_Wildlife_Ponds,_looking_down.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "position": "center center"
  },
  "黑水鸡": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/bird-moorhen.webp",
    "author": "Alexis Lours",
    "url": "https://commons.wikimedia.org/wiki/File:Common_moorhen_(Gallinula_chloropus)_France.jpg",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "position": "center center"
  },
  "翠鸟": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/bird-kingfisher.webp",
    "author": "Andreas Trepte",
    "url": "https://commons.wikimedia.org/wiki/File:Common_Kingfisher_Alcedo_atthis.jpg",
    "license": "CC BY-SA 2.5",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5",
    "position": "center center"
  },
  "白头鹎": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/bird-light-vented-bulbul.webp",
    "author": "Noel Reynolds",
    "url": "https://commons.wikimedia.org/wiki/File:Light-vented_Bulbul_(Pycnonotus_sinensis)_(7184486586).jpg",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "position": "center center"
  },
  "金翅雀": {
    "image": "https://xuancheng-migratory-birds.pages.dev/images/bird-oriental-greenfinch.webp",
    "author": "se1",
    "url": "https://commons.wikimedia.org/wiki/File:Grey-capped_Greenfinch,_Longquanyi,_Chengdu,_Sichuan,_China_1.jpg",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "position": "center center"
  }
};
window.WETLAND_DATA.species.forEach(record => { record.photo = window.WETLAND_DATA.speciesPhotos[record.label]; });

