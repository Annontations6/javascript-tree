addLayer("r", {
    name: "return", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "r", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#808080",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "return points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.525, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('c', 11)) mult = mult.times(player.c.points.sqrt())
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade('low', 12)) exp = exp.add(0.1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
     upgrades: {
		 11: {
			title: "Triple gain",
    		description: "OuO x3<sup>0</sup> -> x3<sup>1</sup> uses for gain.",
    		cost: new Decimal(20),
        },
       12: {
			title: "x4 gain OuO",
    		description: "I DO SO GET HIGH!",
    		cost: new Decimal(120),
        },
       13: {
			title: "Const exponent by 0.02",
    		description: "alsos is good?",
    		cost: new Decimal(900),
        },
       14: {
			title: "Quintuple gain",
    		description: "OuO x5<sup>0</sup> -> x5<sup>1</sup> uses for gain.",
    		cost: new Decimal(5000),
        },
       15: {
			title: "Triple gain II",
    		description: "OuO x3<sup>0</sup> -> x3<sup>1</sup> uses for gain.",
    		cost: new Decimal(4e4),
        },
    },
})

addLayer("c", {
    name: "const", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "c", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#8C8173",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "const points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('r', 11)) mult = mult.times(4)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade('c', 12)) exp = exp.add(0.03)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
	   upgrades: {
		 11: {
			title: "Sqrt product for return points",
    		description: "get mulitipler for square roots to const.",
    		cost: new Decimal(2),
        },
       12: {
			title: "Const expontent by 0.03",
    		description: "get pow pow",
    		cost: new Decimal(10),
        },
       13: {
			title: "Sqrt product for points",
    		description: "get mulitipler for square roots to const.",
    		cost: new Decimal(25),
        },
       14: {
			title: "Wowowoowowowowo",
    		description: "Scalled for double gain.",
    		cost: new Decimal(100),
        },
       15: {
			title: "Base 2",
    		description: "Scalled for x10 gain and unlock new layer..",
    		cost: new Decimal(1000),
        },
    },
})

addLayer("low", {
    name: "lowercase", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "l", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#949966",
    requires: new Decimal(2022), // Can be a function that takes requirement increases into account
    resource: "lowercase points", // Name of prestige currency
    baseResource: "costant points", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('c', 15)},
     upgrades: {
		 11: {
			title: "double gain",
    		description: "OuO x2<sup>0</sup> -> x2<sup>1</sup> uses for gain.",
    		cost: new Decimal(1),
        },
       12: {
			title: "Wasteds?",
    		description: "bonus<sup>1</sup> -> bonus<sup>1.1</sup> on return.",
    		cost: new Decimal(2),
        },
       13: {
			title: "Automation",
    		description: "unlock automation side.",
    		cost: new Decimal(5),
        },
     }
})


addLayer("auto", {
    startData() { return {
        unlocked: true,
    }},
    color: "#C0C0C0",
    symbol: "⚙",
    row: "side",
    position: 0,
    name:"Autobuyers",
    tooltip: "Automation",
    layerShown() {return hasUpgrade('low', 13)},
    tabFormat: [["display-text",
    function() { return '<h2>Automation</h2>' }], "clickables"],
    clickables: {
        13: {
            title: "Return Upgrades",
            display(){
                let text = "Locked"
                if ((hasUpgrade('low', 13)) && (!(player.r.autobuyupgrades))) text = "Off"
                if (hasUpgrade('low', 13) && player.r.autobuyupgrades) text = "On"
                return text
            },
            unlocked() {return hasUpgrade('low', 13)},
            canClick() {return hasUpgrade('low', 13)},
            onClick() { player.r.autobuyupgrades = !player.r.autobuyupgrades },
            style: {"background-color"(){
                let color = "#666666"
                if (player.r.autobuyupgrades) color = "#808080"
                return color
            }},
        },
    },
})