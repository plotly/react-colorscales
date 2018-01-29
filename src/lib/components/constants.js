import chroma from 'chroma-js';

export const COLORSCALE_TYPES = ['sequential', 'divergent', 'categorical', 'cubehelix', 'cmocean', 'custom'];

export const SCALES_WITHOUT_LOG = ['divergent', 'categorical', 'custom'];

export const COLORSCALE_DESCRIPTIONS = {
    sequential: 'Use sequential colorscales for data that smoothly changes value and has meaningful order.',
    divergent: 'Use divergent colorscales for data that smoothly changes around a centerpoint (such as zero).',
    categorical: 'Use categorical colorscales for data that has distinct groups and a non-meaningful order.',
    cubehelix: 'Cubehelix colorscales are like sequential scales, but have the added benefit of printing clearly in black & white. Adjust the "start" slider to change the scale\'s base color. A cubehelix scale with 0 rotation transitions through a single base color. A scale with non-zero rotation "rotates" through other colors. Change the rotation slightly to add a touch of another color, change it more to create a scale with multiple colors.',
    cmocean: 'cmocean colorscales are a mix of sequential and diverging scales. They were originally developed for oceanography data, but can be applied beautifully to any other type of data as well.',
    custom: 'Select a sequential or categorical colorscale, then set customized breakpoints for it in the text box above. The breakpoints should have meaning to your data. For example, you could color data related to human age by groups in between the years 0, 5, 13, 20, 40, and 70. Click the preview colorscale below when you are satisfied with your breakpoints.'
};

export const BREWER = {
    sequential: ["OrRd", "PuBu", "BuPu", "Oranges", "BuGn", "YlOrBr", "YlGn", "Reds", "RdPu", "Greens",
                 "YlGnBu", "Purples", "GnBu", "Greys", "YlOrRd", "PuRd", "Blues", "Viridis"],
    divergent: ["Spectral", "RdYlGn", "RdBu", "PiYG", "PRGn", "RdYlBu", "BrBG", "RdGy"],
    categorical: ["Accent", "Set1", "Set3", "Dark2", "Paired", "Pastel1"]
};

export const CMOCEAN = {
    turbid: ["rgb(232, 245, 171)", "rgb(220, 219, 137)", "rgb(209, 193, 107)", "rgb(199, 168, 83)", 
             "rgb(186, 143, 66)", "rgb(170, 121, 60)", "rgb(151, 103, 58)", "rgb(129, 87, 56)", 
             "rgb(104, 72, 53)", "rgb(80, 59, 46)", "rgb(57, 45, 37)", "rgb(34, 30, 27)"],
    thermal: ["rgb(3, 35, 51)", "rgb(13, 48, 100)", "rgb(53, 50, 155)", "rgb(93, 62, 153)", 
              "rgb(126, 77, 143)", "rgb(158, 89, 135)", "rgb(193, 100, 121)", "rgb(225, 113, 97)", 
              "rgb(246, 139, 69)", "rgb(251, 173, 60)", "rgb(246, 211, 70)", "rgb(231, 250, 90)"],
    haline: ["rgb(41, 24, 107)", "rgb(42, 35, 160)", "rgb(15, 71, 153)", "rgb(18, 95, 142)", 
             "rgb(38, 116, 137)", "rgb(53, 136, 136)", "rgb(65, 157, 133)", "rgb(81, 178, 124)", 
             "rgb(111, 198, 107)", "rgb(160, 214, 91)", "rgb(212, 225, 112)", "rgb(253, 238, 153)"],
    solar: ["rgb(51, 19, 23)", "rgb(79, 28, 33)", "rgb(108, 36, 36)", "rgb(135, 47, 32)", 
            "rgb(157, 66, 25)", "rgb(174, 88, 20)", "rgb(188, 111, 19)", "rgb(199, 137, 22)", 
            "rgb(209, 164, 32)", "rgb(217, 192, 44)", "rgb(222, 222, 59)", "rgb(224, 253, 74)"],
    ice: ["rgb(3, 5, 18)", "rgb(25, 25, 51)", "rgb(44, 42, 87)", "rgb(58, 60, 125)", "rgb(62, 83, 160)", 
          "rgb(62, 109, 178)", "rgb(72, 134, 187)", "rgb(89, 159, 196)", "rgb(114, 184, 205)", 
          "rgb(149, 207, 216)", "rgb(192, 229, 232)", "rgb(234, 252, 253)"],
    gray: ["rgb(0, 0, 0)", "rgb(16, 16, 16)", "rgb(38, 38, 38)", "rgb(59, 59, 59)", "rgb(81, 80, 80)",
           "rgb(102, 101, 101)", "rgb(124, 123, 122)", "rgb(146, 146, 145)", "rgb(171, 171, 170)", 
           "rgb(197, 197, 195)", "rgb(224, 224, 223)", "rgb(254, 254, 253)"],
    oxy: ["rgb(63, 5, 5)", "rgb(101, 6, 13)", "rgb(138, 17, 9)", "rgb(96, 95, 95)", "rgb(119, 118, 118)", 
          "rgb(142, 141, 141)", "rgb(166, 166, 165)", "rgb(193, 192, 191)", "rgb(222, 222, 220)", 
          "rgb(239, 248, 90)", "rgb(230, 210, 41)", "rgb(220, 174, 25)"],
    deep: ["rgb(253, 253, 204)", "rgb(206, 236, 179)", "rgb(156, 219, 165)", "rgb(111, 201, 163)", 
           "rgb(86, 177, 163)", "rgb(76, 153, 160)", "rgb(68, 130, 155)", "rgb(62, 108, 150)", 
           "rgb(62, 82, 143)", "rgb(64, 60, 115)", "rgb(54, 43, 77)", "rgb(39, 26, 44)"],
    dense: ["rgb(230, 240, 240)", "rgb(191, 221, 229)", "rgb(156, 201, 226)", "rgb(129, 180, 227)", 
            "rgb(115, 154, 228)", "rgb(117, 127, 221)", "rgb(120, 100, 202)", "rgb(119, 74, 175)", 
            "rgb(113, 50, 141)", "rgb(100, 31, 104)", "rgb(80, 20, 66)", "rgb(54, 14, 36)"],
    algae: ["rgb(214, 249, 207)", "rgb(186, 228, 174)", "rgb(156, 209, 143)", "rgb(124, 191, 115)", 
            "rgb(85, 174, 91)", "rgb(37, 157, 81)", "rgb(7, 138, 78)", "rgb(13, 117, 71)", "rgb(23, 95, 61)", 
            "rgb(25, 75, 49)", "rgb(23, 55, 35)", "rgb(17, 36, 20)"],
    matter: ["rgb(253, 237, 176)", "rgb(250, 205, 145)", "rgb(246, 173, 119)", "rgb(240, 142, 98)", 
             "rgb(231, 109, 84)", "rgb(216, 80, 83)", "rgb(195, 56, 90)", "rgb(168, 40, 96)", 
             "rgb(138, 29, 99)", "rgb(107, 24, 93)", "rgb(76, 21, 80)", "rgb(47, 15, 61)"],
    speed: ["rgb(254, 252, 205)", "rgb(239, 225, 156)", "rgb(221, 201, 106)", "rgb(194, 182, 59)", 
            "rgb(157, 167, 21)", "rgb(116, 153, 5)", "rgb(75, 138, 20)", "rgb(35, 121, 36)", "rgb(11, 100, 44)", 
            "rgb(18, 78, 43)", "rgb(25, 56, 34)", "rgb(23, 35, 18)"],
    amp: ["rgb(241, 236, 236)", "rgb(230, 209, 203)", "rgb(221, 182, 170)", "rgb(213, 156, 137)", 
          "rgb(205, 129, 103)", "rgb(196, 102, 73)", "rgb(186, 74, 47)", "rgb(172, 44, 36)", "rgb(149, 19, 39)", 
          "rgb(120, 14, 40)", "rgb(89, 13, 31)", "rgb(60, 9, 17)"],
    tempo: ["rgb(254, 245, 244)", "rgb(222, 224, 210)", "rgb(189, 206, 181)", "rgb(153, 189, 156)", 
            "rgb(110, 173, 138)", "rgb(65, 157, 129)", "rgb(25, 137, 125)", "rgb(18, 116, 117)", "rgb(25, 94, 106)", 
            "rgb(28, 72, 93)", "rgb(25, 51, 80)", "rgb(20, 29, 67)"],
    phase: ["rgb(167, 119, 12)", "rgb(197, 96, 51)", "rgb(217, 67, 96)", "rgb(221, 38, 163)", "rgb(196, 59, 224)", 
            "rgb(153, 97, 244)", "rgb(95, 127, 228)", "rgb(40, 144, 183)", "rgb(15, 151, 136)", "rgb(39, 153, 79)", 
            "rgb(119, 141, 17)", "rgb(167, 119, 12)"],
    balance: ["rgb(23, 28, 66)", "rgb(41, 58, 143)", "rgb(11, 102, 189)", "rgb(69, 144, 185)", "rgb(142, 181, 194)", 
              "rgb(210, 216, 219)", "rgb(230, 210, 204)", "rgb(213, 157, 137)", "rgb(196, 101, 72)", "rgb(172, 43, 36)", 
              "rgb(120, 14, 40)", "rgb(60, 9, 17)"],
    delta: ["rgb(16, 31, 63)", "rgb(38, 62, 144)", "rgb(30, 110, 161)", "rgb(60, 154, 171)", "rgb(140, 193, 186)", 
            "rgb(217, 229, 218)", "rgb(239, 226, 156)", "rgb(195, 182, 59)", "rgb(115, 152, 5)", "rgb(34, 120, 36)", 
            "rgb(18, 78, 43)", "rgb(23, 35, 18)"],
    curl: ["rgb(20, 29, 67)", "rgb(28, 72, 93)", "rgb(18, 115, 117)", "rgb(63, 156, 129)", "rgb(153, 189, 156)", 
           "rgb(223, 225, 211)", "rgb(241, 218, 206)", "rgb(224, 160, 137)", "rgb(203, 101, 99)", "rgb(164, 54, 96)",
           "rgb(111, 23, 91)", "rgb(51, 13, 53)"]
};

export const CUBEHELIX = [
    {start:300, rotations:-1.5},
    {start:0, rotations:-0.4},
    {start:0, rotations:-0.1},
    {start:100, rotations:0.4},
    {start:200, rotations:-0.1},
    {start:200, rotations:-0.4},
    {start:200, rotations:0.4},
    {start:300, rotations:-0.1}
];

export const DEFAULT_START = 300;
export const DEFAULT_ROTATIONS = -1.5;
export const DEFAULT_HUE = 1;
export const DEFAULT_GAMMA = 1;
export const DEFAULT_LIGHTNESS = [0.85, 0.15];
export const DEFAULT_NCOLORS = 10;
export const DEFAULT_SWATCHES = 6;
export const DEFAULT_SCALE = chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(DEFAULT_SWATCHES);
export const DEFAULT_LOG_BREAKPOINTS = 4;
export const DEFAULT_BREAKPOINTS = [0, 1];
export const DEFAULT_SWATCH_WIDTH = 20;
export const DEFAULT_NPREVIEWCOLORS = 9;
