function update(){
    $.ajax({
      type:'GET',
      url:'/update',
      success:function(e){
        let logRecords = e.logRecords;
        
        for(var j=0; j < 10 ; j ++){
          let temp =(Date.now()-Date.parse(logRecords[j].date));
          temp = temp /1000;
          var  temp1;
          
          if(temp/12/30/24/60/60>=1){
            temp1 = "more than one years ago";
          }else{
            if(temp/30/24/60/60>=1){
              temp1 = Math.round(temp/30/24/60/60) +'months ago';
            }else{
              if(temp/24/60/60>=1){
                temp1 = Math.round(temp/24/60/60) + 'days ago';
              }else{
                if(temp/60/60>=1){
                  temp1 = Math.round(temp/60/60)+'hours ago';
                }else{
                  if(temp/60>=1){
                    temp1 = Math.round(temp/60)+'minutes ago';
                  }else{
                    temp1 = Math.round(temp) +'seconds ago';
                  }
                }
              }
            }
          }
        $('#logHistory>li').eq(j).html(logRecords[j].sender +' gives ' + logRecords[j].reciver +' a ++ ' + temp1 + '.');
      }
    }});}
    setInterval(update(),60000); 