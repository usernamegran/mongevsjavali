//Personagem padrão
class Character {
    
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }

    get life(){
        return this._life;
    }
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife;
    }
}
//Personagem Guerreiro que extende a classe personagem
class Knight extends Character {
    constructor(name){
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}
//Personagem mago que extende a classe personagem
class Sorcerer extends Character {
    constructor(name){
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

//Personagem Pequeno Monstro que extende a classe personagem
class LittleMonster extends Character{
    constructor(){
        super('Javali');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}
//Personagem grande Monstro que extende a classe personagem
class BigMonster extends Character{
    constructor(){
        super('Javali Hard');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

class Stage{
    constructor(fighter1, fighter2,figher1El,figher2El, logObject){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.figher1El = figher1El;
        this.figher2El = figher2El;
        this.log = logObject;
    }

    start(){
        this.update();


        //TODO: evento do botão de atacar.
        //Ataque do Personagem 1
        this.figher1El.querySelector('.attackButton').addEventListener('click', () => {
            if (Math.random() < 0.5) {
                this.doAttack(this.fighter1, this.fighter2);
            } else {
                this.doSpecialAttack(this.fighter1, this.fighter2);
            }
        });
        //Ataque do Personagem 2
        this.figher2El.querySelector('.attackButton').addEventListener('click', () =>{
            if (Math.random() < 0.5) {
                this.doAttack(this.fighter2, this.fighter1);
            } else {
                this.doSpecialAttack(this.fighter2, this.fighter1);
            }
        });
    }

    update(){
        //Fighter1
        this.figher1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.figher1El.querySelector('.bar').style.width = `${f1Pct}%`;
        if (this.fighter1.life <= 0) {
            this.figher1El.querySelector('.character-img').style.display = 'none';
            this.figher1El.querySelector('.dead-img').style.display = 'block';
        } else {
            this.figher1El.querySelector('.character-img').style.display = 'block';
            this.figher1El.querySelector('.dead-img').style.display = 'none';
        }
        
        //FIghter2
        this.figher2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.figher2El.querySelector('.bar').style.width = `${f2Pct}%`;
        if (this.fighter2.life <= 0) {
            this.figher2El.querySelector('.character-img').style.display = 'none';
            this.figher2El.querySelector('.dead-img').style.display = 'block';
        } else {
            this.figher2El.querySelector('.character-img').style.display = 'block';
            this.figher2El.querySelector('.dead-img').style.display = 'none';
        }
    }

    doAttack(attacking, attacked){
        if(attacking.life <=0 || attacked.life <=0){
            this.log.addMessage('Já era');
            return;
            
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense){
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} em ${attacked.name}`);
        }else {
            this.log.addMessage(`${attacked.name} conseguiu defender!`);
        }

        this.update();
    }
    doSpecialAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage('Já era');
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if (Math.random() < 0.2) {
            // Special attack occurs with 20% chance
            actualAttack *= 2; // Double the attack power
            this.log.addMessage(`${attacking.name} realizou um ataque especial e causou ${actualAttack.toFixed(2)} em ${attacked.name}`);
        }

        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} em ${attacked.name}`);
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender!`);
        }

        this.update();
    }
}

class Log{
    list = [];
    constructor(listEl){
        this.listEl = listEl;
    }

    addMessage(msg){
        this.list.push(msg);
        this.render();
    }

    render(){
        this.listEl.innerHTML = '';
        for(let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}