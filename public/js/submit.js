$('#statusBar').hide();
// showing status msg
function statMsg(i){
  $('#statusBar').show();
  $('#statusBar').html(i);
}
//showing status msg , disappeared in 5 s
function endMsg(i){
   $("#statusBar").show();
    $("#statusBar").html(i);
          setTimeout(()=>{
            $('#statusBar').hide();
          },5000);
}

$('#submit').click((e)=>{
  
    statMsg('Submiting Request.');
    e.preventDefault(); 
  $.ajax({
    type: "POST",
    url: "/addRecord",
    data: $("#Add_Record").serialize(),
    success:function(e){ 
        //return the submit result
        statMsg(e);
        //redirect to logHistory
        window.location.replace("/logHistory");

    }
                
});

});
   $(document).ready(function(){
     $('#reciver').select2();
   });
