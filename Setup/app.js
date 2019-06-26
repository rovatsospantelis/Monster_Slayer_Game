
new Vue({
    el:'#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        actionLog: [],
        humanDamage: 0,
        monsterDamage: 0,
        healing: 0,
        ultDamage: 0
    },
    methods: {
        startGame: function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = true;
            this.actionLog = [];
        },
        attack: function () {
            this.humanDamage = this.calculateDamage(3, 12);
            this.monsterHealth -= this.humanDamage;
            this.actionLog.push({yourDamage: this.humanDamage});
            this.monsterAttack();

            this.checkWin(this.monsterHealth, 'YOU WON');
            this.checkWin(this.playerHealth, 'YOU LOSE');

        },
        ultAttack: function () {
            this.ultDamage = this.calculateDamage(10, 20);
            this.monsterHealth -= this.ultDamage;
            this.actionLog.push({ultDamage: this.ultDamage})
            this.monsterAttack();

            this.checkWin(this.monsterHealth, 'YOU WON');
            this.checkWin(this.playerHealth, 'YOU LOSE');

        },
        heal: function () {
            if (this.playerHealth == 100) {
                alert('YOU DON\'T NEED THAT, YOU ARE HEALTHY');
                return;
            }
            this.healing = Math.max(Math.floor(Math.random()*18) + 1 , 6);
            this.playerHealth += this.healing;
            this.actionLog.push({healing: this.healing});

            if (this.playerHealth > 100) {
                this.playerHealth = 100;
            }

            this.monsterAttack();
            this.checkWin(this.playerHealth, 'YOU LOSE');
        },
        giveUp: function () {
            this.gameIsRunning = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.actionLog = [];
        },
        calculateDamage: function (min, max) {
            var damage = Math.max(Math.floor(Math.random()*max) + 1 , min);
            return damage;
        },
        checkWin: function (health, message) {
            if (health <= 0) {
                alert(message);
                this.gameIsRunning = false;
                if (confirm('NEW GAME?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
            }
        },
        monsterAttack: function () {
            this.monsterDamage = this.calculateDamage(4,14);
            this.playerHealth -= this.monsterDamage;
            this.actionLog.push({monsterDamage: this.monsterDamage})
        },
        barColor: function (health) {
            if (health >30) {
                return {
                    'background-color': 'green',
                    margin: 0,
                    color: 'white',
                    width: health + '%'
                };
            } else {
                return {
                    'background-color': 'red',
                    margin: 0,
                    color: 'white',
                    width: health + '%'
                };
            }
        }
    }
});