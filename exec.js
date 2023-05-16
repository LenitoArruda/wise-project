var removeDuplicates = function(nums) {
    var count = 0;

    for(var i=0;  1 < nums.length; i++){
        if(typeof nums[i] === "string"){
            return nums
        }
        for(var aux=i+1; aux < nums.length; aux++){
            if(nums[aux] === nums[i]){
                nums.splice(aux, 1);
                nums.push("_");
                count ++;
            }
        }
    }
    return nums
};
