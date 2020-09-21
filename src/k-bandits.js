import Bandit from '../src/bandit.js';
import NonstationaryBandit from '../src/nonstationary_bandit.js';
import BanditProblem from '../src/bandit_problem.js';
import p5 from 'p5';

//stationary
function kbandits(){
   // let t = new Test(2);

    let b1 = new Bandit(1, 1);
    let b2 = new Bandit(2, 1);
    let b3 = new Bandit(4, 1);
    let b4 = new Bandit(3, 1);
    let bandits = [b1, b2, b3, b4];
    let avgReward = 0;
    let e = 0.1;
   
    let n = 10000;
    for(let i = 0; i < n; i++){
        let bestBandit;
        let bestActionValue = -1000;
        if(Math.random() > e){
            for(let j = 0; j < bandits.length; j++){
                let b = bandits[j];
                let tempActionValue = b.getEstimatedActionValue();
                if(tempActionValue > bestActionValue){
                    bestActionValue = tempActionValue;
                    bestBandit = b;
                }
            }
        }
        else{
            let random = Math.floor(Math.random()*4)
            bestBandit = bandits[random];
        }

        let reward = bestBandit.getReward();
        bestBandit.updateEstimatedActionValue(reward);

        avgReward = avgReward + (1/(i+1))*(reward - avgReward); 
        //console.log(avgReward);
    }

    console.log("avg reward " + avgReward);
    console.log("b1 " + b1.getEstimatedActionValue())
    console.log("b2 " + b2.getEstimatedActionValue())
    console.log("b3 " + b3.getEstimatedActionValue())
    console.log("b4 " + b4.getEstimatedActionValue())
}

function nonstationaryKBandits(){ 
     let b1 = new Bandit(0, 1);
     let b2 = new Bandit(0, 1);
     let b3 = new Bandit(0, 1);
     let b4 = new Bandit(0, 1);

     let b5 = new NonstationaryBandit(0);
     let b6 = new NonstationaryBandit(0);
     let b7 = new NonstationaryBandit(0);
     let b8 = new NonstationaryBandit(0);

     let bandits = [b1, b2, b3, b4];
     let bandits2 = [b5, b6, b7, b8];
     let avgReward = 0;
     let avgReward2 = 0;

     let e = 0.1; 
     let n = 10000;
     for(let i = 0; i < n; i++){
         let bestBandit;
         let bestActionValue = -1000;
         if(Math.random() > e){
             for(let j = 0; j < bandits.length; j++){
                 let b = bandits[j];
                 let tempActionValue = b.getEstimatedActionValue();
                 if(tempActionValue > bestActionValue){
                     bestActionValue = tempActionValue;
                     bestBandit = b;
                 }
             }
         }
         else{
             let random = Math.floor(Math.random()*4)
             bestBandit = bandits[random];
         }

         let reward = bestBandit.getReward();
         bestBandit.updateEstimatedActionValue(reward);

         let bestBandit2;
         let bestActionValue2 = -1000;
         if(Math.random() > e){
             for(let j = 0; j < bandits2.length; j++){
                 let b = bandits2[j];
                 let tempActionValue = b.getEstimatedActionValue();
                 if(tempActionValue > bestActionValue2){
                     bestActionValue2 = tempActionValue;
                     bestBandit2 = b;
                 }
             }
         }
         else{
             let random = Math.floor(Math.random()*4)
             bestBandit2 = bandits2[random];
         }
       
         let reward2 = bestBandit2.getReward();
         bestBandit2.updateEstimatedActionValue(reward2);
 
         avgReward = avgReward + (1/(i+1))*(reward - avgReward); 
         avgReward2 = avgReward2 + (1/(i+1))*(reward2 - avgReward2); 
     }

     console.log("avg reward " + avgReward);
     console.log("avg reward 2 " + avgReward2);

     console.log("nonstationary b1 " + b1.getEstimatedActionValue())
     console.log("nonstationary b2 " + b2.getEstimatedActionValue())
     console.log("nonstationary b3 " + b3.getEstimatedActionValue())
     console.log("nonstationary b4 " + b4.getEstimatedActionValue())

     console.log("nonstationary b5 " + b5.getEstimatedActionValue())
     console.log("nonstationary b6 " + b6.getEstimatedActionValue())
     console.log("nonstationary b7 " + b7.getEstimatedActionValue())
     console.log("nonstationary b8 " + b8.getEstimatedActionValue())
 }



 const sketch = (p5) =>{

    let totalSteps = 3250;
    let currentStep = 0;

    let n = 1000 //n bandit problems
    let k = 10; //k arms

    let nonstationaryComparison = false;
    let stationaryComparison = false;

    let avgRewards1 = [];
    let avgRewards2 = [];
    let avgRewards3 = [];


    p5.setup = () => {
        let canvas = p5.createCanvas(window.innerWidth * 0.9, window.innerHeight*0.9);
        canvas.parent("canvasContainer");
        console.log("creating canvas");
        canvas.attribute('id', 'canvas0');
        p5.background(p5.color(255, 255, 255));

        let buttonCompareStationary = document.getElementById("buttonCompareStationary");
        let buttonCompareNonstationary = document.getElementById("buttonCompareNonstationary")

        buttonCompareStationary.addEventListener("click", compareStationaryProblems);
        buttonCompareNonstationary.addEventListener("click", compareNonstationaryProblems);
    }

    p5.draw = () => {
        if(currentStep < totalSteps && stationaryComparison){
            let avgReward1 = avgRewards1[currentStep];
            let avgReward2 = avgRewards2[currentStep];
            let avgReward3 = avgRewards3[currentStep];
          /*  console.log("avg reward 1 " + avgReward1);*/

            let x1 = (currentStep+1)*0.5;
            let y1 =  p5.height - avgReward1 * 100;

            let x2 = (currentStep+1)*0.5;
            let y2 = p5.height - avgReward2 * 100;

            let x3 = (currentStep+1)*0.5;
            let y3 = p5.height - avgReward3 * 100;
            
            p5.textSize(21);
            p5.fill(0,0,0);
            p5.text("Comparison of stationary problems", 20, 30)
         //   p5.text("Step " + (currentStep+1), p5.width - 100, 30);

            p5.noStroke();
            p5.fill(0,0,255);
            p5.ellipse(x1,y1,3,3);
            p5.text("e=0.1", 20, 60)

            p5.noStroke();
            p5.fill(255,0,0);
            p5.ellipse(x2,y2,3,3);
            p5.text("e=0.01", 20, 90)

            p5.noStroke();
            p5.fill(0,255,0);
            p5.ellipse(x3,y3,3,3);
            p5.text("e=0.0 (greedy)", 20, 120)


            currentStep++;  
        }
        else if(currentStep < totalSteps && nonstationaryComparison){
            let avgReward1 = avgRewards1[currentStep];
            let avgReward2 = avgRewards2[currentStep];

            let x1 = (currentStep+1)*0.5;
            let y1 =  p5.height - avgReward1 * 1000;

            let x2 = (currentStep+1)*0.5;
            let y2 = p5.height - avgReward2 * 1000
            
            p5.textSize(21);
            p5.fill(0,0,0);
            p5.text("Comparison of nonstationary problems", 20, 30);
        //    p5.text("Step " + (currentStep+1), p5.width - 100, 30);

            p5.noStroke();
            p5.fill(0,0,255);
            p5.ellipse(x1,y1,3,3);
            p5.text("sample-average", 20, 60)

            p5.noStroke();
            p5.fill(255,0,0);
            p5.ellipse(x2,y2,3,3);
            p5.text("constant step-size a=0.1", 20, 90)

            currentStep++;  
        }   
    }

    function nextAction(banditProblems){
        let avgReward = 0;
        for(let j = 0; j < banditProblems.length; j++){
            let banditProblem = banditProblems[j];
            let reward = banditProblem.nextAction();
            avgReward = avgReward + reward;
        }
        avgReward = avgReward / banditProblems.length;
        return avgReward;
    }

    function compareStationaryProblems(){
        console.log("comparing stationary problems")
        p5.background(p5.color(255, 255, 255));
       
        let banditProblems = []; 
        let epsilon = 0.1;
        for(let i = 0; i < n; i++){
    
            let bandits = [];
            for(let j = 0; j < k; j++){
                let bandit = new Bandit(Math.floor(Math.random()*6), Math.floor(Math.random()*5));
                bandits.push(bandit);
            } 
            banditProblems.push(new BanditProblem(bandits, epsilon));
        }
    
        let banditProblems2 = []; 
        epsilon = 0.01;
        for(let i = 0; i < n; i++){
            let bandits = [];
            for(let j = 0; j < k; j++){
                let bandit = new Bandit(Math.floor(Math.random()*6), Math.floor(Math.random()*5));
                bandits.push(bandit);
            } 
            banditProblems2.push(new BanditProblem(bandits, epsilon));
        }

        let banditProblems3 = []; 
        epsilon = 0;
        for(let i = 0; i < n; i++){
            let bandits = [];
            for(let j = 0; j < k; j++){
                let bandit = new Bandit(Math.floor(Math.random()*6), Math.floor(Math.random()*5));
                bandits.push(bandit);
            } 
            banditProblems3.push(new BanditProblem(bandits, epsilon));
        }
    
        avgRewards1 = [];
        avgRewards2 = [];
        avgRewards3 = [];
        while(currentStep < totalSteps){
            let avgReward1 = nextAction(banditProblems);
            let avgReward2 = nextAction(banditProblems2); 
            let avgReward3 = nextAction(banditProblems3); 
            avgRewards1.push(avgReward1);
            avgRewards2.push(avgReward2); 
            avgRewards3.push(avgReward3);
            currentStep++;
        }
        currentStep = 0;
        stationaryComparison = true;
        nonstationaryComparison = false;
    }
    
    function compareNonstationaryProblems(){ 
        console.log("comparing nonstationary problems")
        p5.background(p5.color(255, 255, 255));
        let banditProblems = []; 
        let epsilon = 0.1;
        let actionValueMethod = 0;
        for(let i = 0; i < n; i++){
    
            let bandits = [];
            for(let j = 0; j < k; j++){
                let bandit = new NonstationaryBandit(0, actionValueMethod);
                bandits.push(bandit);
            } 
            banditProblems.push(new BanditProblem(bandits, epsilon));
        }
    
        let banditProblems2 = []; 
        epsilon = 0.1;
        actionValueMethod = 1;
        for(let i = 0; i < n; i++){
            let bandits = [];
            for(let j = 0; j < k; j++){
                let bandit = new NonstationaryBandit(0, actionValueMethod);
                bandits.push(bandit);
            } 
            banditProblems2.push(new BanditProblem(bandits, epsilon));
        }
    
        avgRewards1 = [];
        avgRewards2 = [];
        while(currentStep < totalSteps){
            let avgReward1 = nextAction(banditProblems);
            let avgReward2 = nextAction(banditProblems2); 
            avgRewards1.push(avgReward1);
            avgRewards2.push(avgReward2); 
            currentStep++;
        }
        currentStep = 0;
        stationaryComparison = false;
        nonstationaryComparison = true;
    }

    

 }

 new p5(sketch);



//kbandits();
//nonstationaryKBandits();


