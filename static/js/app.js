
var modal = document.getElementById("myModal");
var model_close_btn = document.getElementsByClassName("close")[0];
var model_submit_btn = document.getElementsByClassName("model_submit")[0];


model_close_btn.onclick = function() {
    modal.style.display = "none";
}

model_submit_btn.onclick = function() {
    category = $("#category option:selected").val();
    img_src = "flashcards/"+category+"/"+"1.jpeg"
    $('#image').attr("src",img_src);
    modal.style.display = "none";
}



$(function() {
    //Enable swiping...
    $("#swipe_area").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if(direction == "down"){
                modal.style.display = "block";
            }
            if(direction == "left"){
                var image_src = $('#image').attr("src");
                category = image_src.split("/")[1]
                file_name = image_src.split("/")[2]
                update_img(category,file_name,"left")
            }

            if(direction == "right"){
                var image_src = $('#image').attr("src");
                category = image_src.split("/")[1]
                file_name = image_src.split("/")[2]
                update_img(category,file_name,"right")
            }	
            	
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
       threshold:0
    });
});

function update_img(category,file_name, swipe_type){
    tmp = parseInt(file_name.replace(".jpeg",""))    
    if(swipe_type == "left"){
        if(fc_data[category] == tmp){
            var snd = new Audio("static/sound/error.wav"); // buffers automatically when created
            snd.play();
            return;
        }else{
            tmp = tmp + 1
        }
    }

    if(swipe_type == "right"){
        if(tmp == 1){
            // alert("first")
            var snd = new Audio("static/sound/error.wav"); // buffers automatically when created
            snd.play();
            return;
        }else{
            tmp = tmp - 1
        }
    }
    // var snd = new Audio("static/sound/swipe.wav"); // buffers automatically when created
    // snd.play();
    img_src = "flashcards/"+category+"/"+tmp+".jpeg"
    $('#image').attr("src",img_src);
}