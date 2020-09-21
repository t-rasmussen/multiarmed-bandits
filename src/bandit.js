import Z from 'random-z'

class Bandit{
    
    constructor(avg, variance){
        this.avg = avg;
        this.variance = variance;
        this.n = 0;
        this.Q = 0;
    }

    getReward(){
        let newRandomSample = Z();
        return newRandomSample*this.variance+this.avg;
    }

    updateEstimatedActionValue(target){
        this.n = this.n + 1
        this.Q = this.Q + (1/this.n)*(target - this.Q);     
    }

    getEstimatedActionValue(){
        return this.Q;
    }



}

export default Bandit;