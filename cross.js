const emptyPuzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta']


const newpuzle = emptyPuzzle.split('\n')
console.log(newpuzle);
newpuzle[0][2]='kkkkk'
console.log(newpuzle);





function solve(newpuzle ,words ,index){
    if (index ==words.length-1 ){

        return  true
    }

    let rows =  newpuzle.length
    let col =  newpuzle[0].length

    for (let i =0;i<rows;i++){
        for(let j=0;j<col;j++){
            if(canplacehorizontal(newpuzle,words[index],i,j)){
                   placehorizontal(newpuzle,words[index],i,j)
                   
                   if(solve(newpuzle,words,index+1))     {
                    return true
                   }  

                   removehorizontal(newpuzle,words[i],i,j)


            }
                if(canplacevertical(newpuzle,words[index],i,j)){
                   placevertical(newpuzle,words[index],i,j)
                   
                   if(solve(newpuzle,words,index+1))     {
                    return true
                   }  

                   removevertical(newpuzle,words[i],i,j)


            }





        }

    }


  return false




    
}

function canplacehorizontal(newpuzle ,words,i,j){
    if(j +words.length >words[i]){
        return false
    }

    for(let n =0;n<words.length;n++){

        let c = newpuzle[i][j+n]
         if(c =='.'){
            return false
         }
         if(c != '1'&& c!='2'&& c!= words[n]&& c!=='0'){
            return false
         }



    }
  return true

}

function placehorizontal(newpuzle,words,i,j){
    let r = newpuzle[i].split('')

    for(let n=0;n<words.length;n++){
           r[j+n]=words[n]

    }

  newpuzle[i]=r.join('')


}
function removehorizontal(newpuzle,words,i,j){
     let r = newpuzle[i].split('')

    for(let n=0;n<words.length;n++){
           r[j+n]='1'

    }

  newpuzle[i]=r.join('')
}

function canplacevertical(newpuzle,words,i,j){
  if(i +words.length>newpuzle.length){
    return false

  }
   for(let n =0;n<words.length;n++){

        let c = newpuzle[i+n][j]
         if(c =='.'){
            return false
         }
         if(c != '1'&& c!='2'&& c!= words[n]&& c!=='0'){
            return false
         }



    }
  return true






}
function placevertical(newpuzle,words,i,j){


 for(let n=0;n<words.length;n++){
    let r = newpuzle[i+n].split('')
    r[j]=  words[n]
    newpuzle[i+n]=r.join('')

  
    }

}

function removevertical(newpuzle,words,i,j){

 for(let n=0;n<words.length;n++){
    let r = newpuzle[i+n].split('')
    r[j]=  '1'
    newpuzle[i+n]=r.join('')

  
    }


}

solve(newpuzle,words,0)

 console.log(newpuzle.join('\n'));
 