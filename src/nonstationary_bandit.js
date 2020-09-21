import Z from 'random-z'

class NonstationaryBandit{
    
    constructor(avg, actionValueMethod){
        this.avg = avg;
        this.actionValueMethod = actionValueMethod;
        this.n = 0;
        this.Q = 0;
        this.stepsize = 0.1;
    }

    getReward(){
        let increment = Z()*0.01;
        this.avg = this.avg + increment;
        return this.avg;
    }

    updateEstimatedActionValue(target){
        if(this.actionValueMethod == 0){
            this.n = this.n + 1;
            this.Q = this.Q + (1/this.n)*(target - this.Q);    
        }
        else if(this.actionValueMethod == 1){
            this.Q = this.Q + this.stepsize*(target - this.Q); 
        }
    }

    getEstimatedActionValue(){
        return this.Q;
    }

}

export default NonstationaryBandit;