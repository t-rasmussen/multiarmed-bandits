import Bandit from "./bandit";

class BanditProblem{
    constructor(bandits, e){
        this.bandits = bandits;
        this.e = e;
    }

    nextAction(){
        let bestBandit;
        let bestActionValue = -1000;
        if(Math.random() > this.e){
            for(let j = 0; j < this.bandits.length; j++){
                let b = this.bandits[j];
                let tempActionValue = b.getEstimatedActionValue();
                if(tempActionValue > bestActionValue){
                    bestActionValue = tempActionValue;
                    bestBandit = b;
                }
            }
        }
        else{
            let random = Math.floor(Math.random()*4)
            bestBandit = this.bandits[random];
        }

        let reward = bestBandit.getReward();
        bestBandit.updateEstimatedActionValue(reward);

        return reward;
    }
}

export default BanditProblem;