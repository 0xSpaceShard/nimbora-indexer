export const LiquityEvents = [
  {
    name: 'BatchRequest',
    fn: 'liquity_HandleBatchRequest',
  },
  {
    name: 'ActionProcessed',
    fn: 'liquity_actionProcessed',
  },
];

export const lusdEvents = [
  {
    name: 'Transfer',
    fn: 'liquity_Transfer',
  }
]

const liquityAddressesMainnet = [
  {
    name: 'trove_275',
    contract: '0x3580a65260563b5511ddf2eafb83d6b309dce7fc25271df8c040a437f09a399',
    start: 219242,
    events: LiquityEvents,
    blocks: [
      219242, 219248, 247266, 247266, 250884, 250948, 250990, 250990, 252141, 255380, 255427, 259061, 259061, 260748,
      286649, 316586, 316586, 316591, 317314, 328119, 328203, 328255, 328279, 330076, 330076, 331369, 342278, 347862,
      348702, 348704, 348716, 348950, 348982, 348995, 349087, 349087, 349094, 349108, 349123, 349127, 349132, 349132,
      349132, 349568, 349598, 349652, 349866, 349915, 350064, 350275, 350275, 350582, 350602, 350630, 350819, 350864,
      350864, 351465, 351466, 351468, 351469, 351615, 351635, 351722, 351722, 352500, 352710, 352933, 354677, 354784,
      354786, 355061, 355083, 355249, 355252, 355288, 355990, 356346, 356537, 356555, 356591, 356591, 356636, 356661,
      356817, 357721, 357730, 357800, 358099, 358268, 358272, 358335, 358410, 358479, 358479, 359151, 359265, 359687,
      360082, 360090, 360129, 361168, 362007, 362228, 362235, 363443, 364251, 365561, 365587, 365811, 365976, 365976,
      366451, 366780, 367353, 367967, 368006, 368529, 368529, 368539, 368605, 368829, 368878, 369058, 370402, 370563,
      370750, 371062, 371093, 373224, 374248, 374248, 374800, 374843, 374870, 375342, 375549, 375549, 375551, 375561,
      375646, 375655, 375755, 375761, 375761, 375801, 375807, 376397, 376399, 376409, 376463, 376804, 377002, 377446,
      378299, 380007, 381264, 381264, 381269, 381903, 382490, 382504, 382677, 384422, 384717, 386975, 387181, 391662,
      391947, 392060, 393564, 393678, 394392, 394611, 395154, 395396, 395804, 396677, 397000, 397144, 397661, 399356,
      400501, 401818, 401821, 402218, 402602, 405314, 415757, 416196, 417024, 419351, 420616, 420620, 420649, 421388,
      422492, 422493, 422770, 423528, 423750, 425586, 425597, 426476, 428396, 429552, 430216, 430266, 431809, 432310,
      432398, 432403, 433078, 433085, 433513, 433958, 434809, 435661, 435726, 437128, 437867, 438448, 440642, 440675,
      440679, 440799, 440856, 440983, 441009, 441450, 442983, 443212, 443234, 443374, 443619, 443867, 443893, 445336,
      445467, 445675, 445803, 445828, 445842, 445957, 446232, 446302, 446308, 447153, 447227, 447695, 448081, 448114,
      448312, 448332, 448671, 448987, 449070, 449519, 449819, 449945, 450623, 450768, 450798, 450944, 450995, 451733,
      451740, 452387, 452496, 453628, 453838, 454383, 455114, 455982, 456146, 457013, 457121, 457465, 457612, 458688,
      459174, 459242, 459314, 460234, 460338, 461108, 461756, 461960, 461971, 462189, 462228, 462236, 462410, 462873,
      462908, 463853, 464021, 464202, 464316, 464684, 464725, 464877, 465284, 465287, 465413, 465615, 465658, 466172,
      466626, 466695, 466985, 467157, 467434, 467456, 467502, 467511, 467539, 467728, 467730, 468609, 468648, 468734,
      468918, 469238, 469378, 469391, 469464, 469825, 470113, 470365, 470366, 470432, 470438, 470491, 470495, 470529,
      470529, 470675, 470743, 471052, 471052, 471133, 471478, 471693, 472132, 472237, 472269, 472320, 472325, 472689,
      472704, 472705, 472712, 472715, 472832, 472964, 473004, 473059, 473214, 473272, 473310, 473339, 473339, 473365,
      473369, 473398, 473914, 474156, 474180, 474181, 474181, 474191, 474222, 474416, 474443, 474734, 475541, 475646,
      475686, 475708, 475924, 475930, 476290, 476512, 476726, 476801, 477314, 477328, 477371, 477784, 477811, 477826,
      478181, 478451, 478579, 479096, 479228, 479423, 479570, 480240, 480263, 480559, 480903, 480976, 481006, 481021,
      481160, 481255, 481506, 481600, 482006, 482434, 482740, 482822, 482862, 483303, 483393, 483396, 484082, 484118,
      484438, 484527, 486059, 486253, 486324, 486325, 486556, 487087, 487110, 487810, 487891, 488077, 488223, 489350,
      489629, 489965, 490181, 490355, 490356, 490460, 491475, 491608, 491688, 491803, 491823, 491958, 492390, 492746,
      492769, 493149, 493200, 493543, 493544, 494333, 494356, 495143, 495532, 495581, 495589, 495596, 495602, 495606,
      495607, 495607, 496044, 496179, 496481, 497580, 497891, 498052, 498195, 498459, 498567, 498782, 499501, 500096,
      500271, 500273, 500621, 500626, 500627, 500697, 500726, 500728, 500900, 501054, 501059, 501502, 501504, 501534,
      502970, 503272, 503296, 504405, 504543, 504596, 504698, 505260, 505478, 505636, 506104, 506967, 508413, 508469,
      508742, 508932, 508982, 509954, 512721, 512721, 513009, 513103, 513991, 514862, 515666, 517514, 517992, 518820,
      519273, 519667, 520361, 521385, 521513, 521520, 521818, 521873, 525582, 526661, 528568, 528580, 528615, 528868,
      529648, 529812, 530966, 531795, 532323, 532328, 532617, 532736, 533321, 533793, 533877, 536189, 536337, 537223,
      537330, 537813, 538535, 539221, 539787, 540263, 542066, 542178, 542218, 543616, 544252, 546147, 546201, 546210,
      546832, 547670, 548538, 549121, 549460, 549470, 550057, 550063, 550093, 550380, 553903, 553913, 554220, 554273,
      554303, 554323, 554582, 555236, 561934, 567873, 573995, 574065, 576246, 577318, 580051, 580978, 586478, 589270,
      590709, 593163, 594164, 594753, 594988, 596973, 598155, 599342, 599488, 600409, 601519, 601597, 601749, 601882,
      602131, 602698, 602762, 602890, 602912, 603477, 603533, 604303, 604324, 605077, 606223, 606844, 606906, 608038,
      608122, 608130, 608131, 608136, 608158, 608122, 608130, 608131, 608136, 608158, 608393, 608536, 608714, 608726,
      608760, 608805, 608837, 608845, 608884, 609558, 610300, 610302, 610325, 610684, 611262, 611384, 611883, 612976,
      613310, 614780, 614780, 614812, 614817, 614879, 614937, 614967, 614972, 615625, 616584, 617127, 617680, 617726,
      617738, 617970, 617972, 618197, 618235, 618694, 619264, 619278, 619587, 619621, 619734, 619895, 620612, 620810,
      620818, 620819, 620960, 621120, 621121, 621135, 621583, 621653, 621654, 621693, 621844, 621845, 622081, 622165,
      622246, 622622, 622732, 622781, 622875, 622950, 622984, 622988, 623054, 623054, 623283, 623504, 623600, 623646,
      623681, 623706, 623727, 623824, 623846, 623874,
    ],
  },
  {
    name: 'trove_400',
    contract: '0x2a67288e48a8c4e2881aee422da7841fc11fef195e0a81f929871c77f07509d',
    start: 330816,
    events: LiquityEvents,
    blocks: [
      330816, 330821, 330846, 335531, 342277, 347880, 347880, 348578, 348705, 348718, 348736, 348934, 348981, 349039,
      349039, 349087, 349688, 350125, 350291, 350302, 350362, 350362, 350381, 351665, 351907, 351917, 352130, 352889,
      352908, 352910, 353459, 355315, 356622, 357330, 357347, 357920, 357920, 358300, 358592, 358614, 359105, 360458,
      360502, 361245, 362498, 362986, 363035, 363499, 364205, 364205, 364408, 366815, 367163, 368538, 368892, 370395,
      370807, 373794, 375118, 379373, 379642, 380363, 382139, 382351, 383127, 384424, 384521, 384735, 387521, 389519,
      389973, 390217, 391823, 394861, 394887, 396395, 396836, 396842, 400545, 403535, 415925, 416017, 417219, 437467,
      440680, 440681, 440991, 442168, 442190, 443459, 444601, 446010, 448988, 450303, 455236, 455549, 458391, 458581,
      458874, 462893, 463276, 463837, 465503, 467317, 467538, 470129, 470135, 470791, 471032, 472700, 472965, 473049,
      473166, 473408, 474199, 474216, 474248, 474551, 475709, 475938, 476021, 476956, 477196, 477330, 477418, 477469,
      477630, 478343, 478746, 478920, 479214, 479217, 479367, 480078, 480253, 480580, 480616, 480715, 481556, 481619,
      481667, 481877, 482007, 482341, 482739, 482760, 482783, 483013, 483430, 483451, 483452, 483455, 483766, 484088,
      485394, 485418, 485827, 488658, 488673, 489645, 490139, 490465, 490471, 491041, 491609, 491771, 492143, 492476,
      493398, 493716, 495559, 495576, 496956, 497389, 498500, 499562, 499911, 500627, 500704, 500904, 501062, 502972,
      503274, 504357, 505421, 505655, 508896, 508902, 509275, 511540, 514882, 514890, 519274, 519979, 519984, 520288,
      521765, 535515, 536207, 536252, 536258, 536785, 537819, 549652, 564455, 591665, 591666, 593713, 598364, 601679,
      609188, 609338, 609655, 613005, 614295, 614870, 616914, 617366, 618694, 619282, 620092, 620315, 621688, 621837,
      622218, 622731, 623067,
    ],
  },
  {
    name: 'lusd',
    contract: '0x070a76fd48ca0ef910631754d77dd822147fe98a569b826ec85e3c33fde586ac',
    start: 594160,
    events: lusdEvents,
    blocks: [
      219242, 219248, 247266, 247266, 250884, 250948, 250990, 250990, 252141, 255380, 255427, 259061, 259061, 260748,
      286649, 316586, 316586, 316591, 317314, 328119, 328203, 328255, 328279, 330076, 330076, 330816, 330821, 330846,
      331369, 335531, 342277, 342278, 347862, 347880, 347880, 348578, 348702, 348704, 348705, 348716, 348718, 348736,
      348934, 348950, 348981, 348982, 348995, 349039, 349039, 349087, 349087, 349087, 349094, 349108, 349123, 349127,
      349132, 349132, 349132, 349568, 349598, 349652, 349688, 349866, 349915, 350064, 350125, 350275, 350275, 350291,
      350302, 350362, 350362, 350381, 350582, 350602, 350630, 350819, 350864, 350864, 351465, 351466, 351468, 351469,
      351615, 351635, 351665, 351722, 351722, 351907, 351917, 352130, 352500, 352710, 352889, 352908, 352910, 352933,
      353459, 354677, 354784, 354786, 355061, 355083, 355249, 355252, 355288, 355315, 355990, 356346, 356537, 356555,
      356591, 356591, 356622, 356636, 356661, 356817, 357330, 357347, 357721, 357730, 357800, 357920, 357920, 358099,
      358268, 358272, 358300, 358335, 358410, 358479, 358479, 358592, 358614, 359105, 359151, 359265, 359687, 360082,
      360090, 360129, 360458, 360502, 361168, 361245, 362007, 362228, 362235, 362498, 362986, 363035, 363443, 363499,
      364205, 364205, 364251, 364408, 365561, 365587, 365811, 365976, 365976, 366451, 366780, 366815, 367163, 367353,
      367967, 368006, 368529, 368529, 368538, 368539, 368605, 368829, 368878, 368892, 369058, 370395, 370402, 370563,
      370750, 370807, 371062, 371093, 373224, 373794, 374248, 374248, 374800, 374843, 374870, 375118, 375342, 375549,
      375549, 375551, 375561, 375646, 375655, 375755, 375761, 375761, 375801, 375807, 376397, 376399, 376409, 376463,
      376804, 377002, 377446, 378299, 379373, 379642, 380007, 380363, 381264, 381264, 381269, 381903, 382139, 382351,
      382490, 382504, 382677, 383127, 384422, 384424, 384521, 384717, 384735, 386975, 387181, 387521, 389519, 389973,
      390217, 391662, 391823, 391947, 392060, 393564, 393678, 394392, 394611, 394861, 394887, 395154, 395396, 395804,
      396395, 396677, 396836, 396842, 397000, 397144, 397661, 399356, 400501, 400545, 401818, 401821, 402218, 402602,
      403535, 405314, 415757, 415925, 416017, 416196, 417024, 417219, 419351, 420616, 420620, 420649, 421388, 422492,
      422493, 422770, 423528, 423750, 425586, 425597, 426476, 428396, 429552, 430216, 430266, 431809, 432310, 432398,
      432403, 433078, 433085, 433513, 433958, 434809, 435661, 435726, 437128, 437467, 437867, 438448, 440642, 440675,
      440679, 440680, 440681, 440799, 440856, 440983, 440991, 441009, 441450, 442168, 442190, 442983, 443212, 443234,
      443374, 443459, 443619, 443867, 443893, 444601, 445336, 445467, 445675, 445803, 445828, 445842, 445957, 446010,
      446232, 446302, 446308, 447153, 447227, 447695, 448081, 448114, 448312, 448332, 448671, 448987, 448988, 449070,
      449519, 449819, 449945, 450303, 450623, 450768, 450798, 450944, 450995, 451733, 451740, 452387, 452496, 453628,
      453838, 454383, 455114, 455236, 455549, 455982, 456146, 457013, 457121, 457465, 457612, 458391, 458581, 458688,
      458874, 459174, 459242, 459314, 460234, 460338, 461108, 461756, 461960, 461971, 462189, 462228, 462236, 462410,
      462873, 462893, 462908, 463276, 463837, 463853, 464021, 464202, 464316, 464684, 464725, 464877, 465284, 465287,
      465413, 465503, 465615, 465658, 466172, 466626, 466695, 466985, 467157, 467317, 467434, 467456, 467502, 467511,
      467538, 467539, 467728, 467730, 468609, 468648, 468734, 468918, 469238, 469378, 469391, 469464, 469825, 470113,
      470129, 470135, 470365, 470366, 470432, 470438, 470491, 470495, 470529, 470529, 470675, 470743, 470791, 471032,
      471052, 471052, 471133, 471478, 471693, 472132, 472237, 472269, 472320, 472325, 472689, 472700, 472704, 472705,
      472712, 472715, 472832, 472964, 472965, 473004, 473049, 473059, 473166, 473214, 473272, 473310, 473339, 473339,
      473365, 473369, 473398, 473408, 473914, 474156, 474180, 474181, 474181, 474191, 474199, 474216, 474222, 474248,
      474416, 474443, 474551, 474734, 475541, 475646, 475686, 475708, 475709, 475924, 475930, 475938, 476021, 476290,
      476512, 476726, 476801, 476956, 477196, 477314, 477328, 477330, 477371, 477418, 477469, 477630, 477784, 477811,
      477826, 478181, 478343, 478451, 478579, 478746, 478920, 479096, 479214, 479217, 479228, 479367, 479423, 479570,
      480078, 480240, 480253, 480263, 480559, 480580, 480616, 480715, 480903, 480976, 481006, 481021, 481160, 481255,
      481506, 481556, 481600, 481619, 481667, 481877, 482006, 482007, 482341, 482434, 482739, 482740, 482760, 482783,
      482822, 482862, 483013, 483303, 483393, 483396, 483430, 483451, 483452, 483455, 483766, 484082, 484088, 484118,
      484438, 484527, 485394, 485418, 485827, 486059, 486253, 486324, 486325, 486556, 487087, 487110, 487810, 487891,
      488077, 488223, 488658, 488673, 489350, 489629, 489645, 489965, 490139, 490181, 490355, 490356, 490460, 490465,
      490471, 491041, 491475, 491608, 491609, 491688, 491771, 491803, 491823, 491958, 492143, 492390, 492476, 492746,
      492769, 493149, 493200, 493398, 493543, 493544, 493716, 494333, 494356, 495143, 495532, 495559, 495576, 495581,
      495589, 495596, 495602, 495606, 495607, 495607, 496044, 496179, 496481, 496956, 497389, 497580, 497891, 498052,
      498195, 498459, 498500, 498567, 498782, 499501, 499562, 499911, 500096, 500271, 500273, 500621, 500626, 500627,
      500627, 500697, 500704, 500726, 500728, 500900, 500904, 501054, 501059, 501062, 501502, 501504, 501534, 502970,
      502972, 503272, 503274, 503296, 504357, 504405, 504543, 504596, 504698, 505260, 505421, 505478, 505636, 505655,
      506104, 506967, 508413, 508469, 508742, 508896, 508902, 508932, 508982, 509275, 509954, 511540, 512721, 512721,
      513009, 513103, 513991, 514862, 514882, 514890, 515666, 517514, 517992, 518820, 519273, 519274, 519667, 519979,
      519984, 520288, 520361, 521385, 521513, 521520, 521765, 521818, 521873, 525582, 526661, 528568, 528580, 528615,
      528868, 529648, 529812, 530966, 531795, 532323, 532328, 532617, 532736, 533321, 533793, 533877, 535515, 536189,
      536207, 536252, 536258, 536337, 536785, 537223, 537330, 537813, 537819, 538535, 539221, 539787, 540263, 542066,
      542178, 542218, 543616, 544252, 546147, 546201, 546210, 546832, 547670, 548538, 549121, 549460, 549470, 549652,
      550057, 550063, 550093, 550380, 553903, 553913, 554220, 554273, 554303, 554323, 554582, 555236, 561934, 564455,
      567873, 573995, 574065, 576246, 577318, 580051, 580978, 586478, 589270, 590709, 591665, 591666, 593163, 593713,
      594164, 594753, 594988, 596973, 598155, 598364, 599342, 599488, 600409, 601519, 601597, 601679, 601749, 601882,
      602131, 602698, 602762, 602890, 602912, 603477, 603533, 604303, 604324, 605077, 606223, 606844, 606906, 608038,
      608122, 608122, 608130, 608130, 608131, 608131, 608136, 608136, 608158, 608158, 608393, 608536, 608714, 608726,
      608760, 608805, 608837, 608845, 608884, 609188, 609338, 609558, 609655, 610300, 610302, 610325, 610684, 611262,
      611384, 611883, 612976, 613005, 613310, 614295, 614780, 614780, 614812, 614817, 614870, 614879, 614937, 614967,
      614972, 615625, 616584, 616914, 617127, 617366, 617680, 617726, 617738, 617970, 617972, 618197, 618235, 618694,
      618694, 619264, 619278, 619282, 619587, 619621, 619734, 619895, 620092, 620315, 620612, 620810, 620818, 620819,
      620960, 621120, 621121, 621135, 621583, 621653, 621654, 621688, 621693, 621837, 621844, 621845, 622081, 622165,
      622218, 622246, 622622, 622731, 622732, 622781, 622875, 622950, 622984, 622988, 623054, 623054, 623067, 623283,
      623504, 623600, 623646, 623681, 623706, 623727, 623824, 623846, 623874,
    ],
  }
];

const liquityAddressesSepolia = [
  {
    name: 'trove_400',
    contract: '',
    start: 0,
    events: LiquityEvents,
    blocks: [],
  },
  {
    name: 'trove_275',
    contract: '',
    start: 0,
    events: LiquityEvents,
    blocks: [],
  },
];

export const liquityAddresses = (network: string) => {
  switch (network) {
    case 'mainnet':
      return liquityAddressesMainnet;
    case 'sepolia':
      return liquityAddressesSepolia;
  }
};
