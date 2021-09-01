// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorDNA = () => {
  const newDNA = []
  for(let i=0; i<4; i++) {
    newDNA.push(returnRandBase())
  }
  return newDNA;
}
 
const pAequorFactory = (number, array) => {
  return {
    specimenNum: number,
    dna: array,
    mutate() {
      let i = Math.floor(Math.random() * this.dna.length)

      let oldBase = this.dna[i]

      let altBases = ['A', 'T', 'C', 'G'];

      altBases.splice(altBases.indexOf(oldBase), 1) 

      let mutatedBase = altBases[Math.floor(Math.random() * 3)]

      console.log(`Old base: ${oldBase} is changed to ${mutatedBase} on a number ${i}`)
      let pAequor = this.dna.splice(i, 1, mutatedBase);
      console.log(pAequor)
      return this.dna
    },
    compareDNA(pAequor) {
      let DNA1 = this.dna;
      let DNA2 = pAequor;
      let match = [];
      for(let i in this.dna) {
        if(DNA1[i] === DNA2[i]) {
          match[i] = 1
        } else {
          match[i] = 0
        }
      };
      let percentage = (match.reduce((a, c) => a + c,0))/15*100;
      let hits = [];
      for (let i in match) {
        if(match[i]) {hits.push(i)}
      }
      console.log(`Specimen #${this.specimenNum} and Specimen #${pAequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common`);
      return percentage.toFixed(2);
    },

    willLikelySurvice() {
      let cgBases = this.dna.reduce((a, b) => {
        if(b === 'C' || b === 'G') {
          a += 1
        }
        return a
      }, 0)
      let percentage = cgBases / 0.15
      console.log(`Percentage of survival: ${percentage.toFixed(2)}`)
      if(percentage >= 60) {
        return true
      } else {
        return false
      }
    },

    // get 15 of the surviceInstance to do more exprirement
    get15Instance() {
      const survivalInstance = []
      let countInstance = 0
      while(countInstance<31) {
        let ans = pAequorFactory(Math.floor(Math.random()*15), mockUpStrand())
        if(ans.willLikelySurvice()) {
          survivalInstance.push(ans.dna)
          countInstance++
        }
      } 
      console.log(survivalInstance)
    },

    conolementStrand() {
      let cDNAStrand = this.dna.reduce((a, b) => {
        switch(b) {
          case 'C':
            a.push('G')
            break;
          case 'G':
            a.push('C')
            break;
          case 'A':
            a.push('T');
            break;
          case 'T':
            a.push('A')
            break;
        } 
        return a
      }, [])
      return cDNAStrand;
    }

  }
}


let ans = pAequorFactory(1, mockUpStrand())

console.log(ans)
console.log(ans.mutate())
console.log(ans.dna)
ans.compareDNA(['A', 'T', 'G', 'G'])
console.log(ans.willLikelySurvice())

ans.get15Instance()
console.log('DNA:'+ans.dna)
console.log(ans.conolementStrand())







