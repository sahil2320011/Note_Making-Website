console.log("Sahil can see your Notes");
showNotes();

let addBtn=document.getElementById("added");

addBtn.addEventListener("click",function(e){
    let addTxt=document.getElementById("addTxt");
    let notes=localStorage.getItem("notes");

    if(addTxt.value!=""){
    if(notes==null){
        notesObj=[];
    }else{
        notesObj=JSON.parse(notes);    //notesObj is an array
    }

    notesObj.push(addTxt.value.toLowerCase());
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value="";
    // console.log(notesObj);
    showNotes();
    }else{
        alert("Your Note is Empty");
    }
});

function showNotes(){
    let notes= localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }else{
        notesObj=JSON.parse(notes);    //notesObj is an array
    }
    
    let html="";
    notesObj.forEach(function(element,index){
        html+=
            `<div class="new_content">
            <div class="my_notes">
                <p class="writing">${element}</p>
            </div>
            <button id="${index}" onclick="deleteNode(this.id)" class="add2">Remove</button>
            </div>`;
    });

    let notesElm=document.getElementById('pad');

    if(notesObj.length!=0)
    {
        notesElm2=document.getElementById('pad_head');
        notesElm2.innerHTML="";
        notesElm.innerHTML=html;
    }else{
        let notesElm2=document.getElementById('pad_head');
        notesElm2.innerHTML=`<br><h3 style="font-family: 'Open Sans', sans-serif; font-weight:100; text-align: center;font-size: 1.5rem;">Your Notes Are Empty</h3>`
        notesElm.innerHTML="";
    }

}

function deleteNode(index){
    // console.log("I am deleting",index);
    let notes= localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }else{
        notesObj=JSON.parse(notes);    //notesObj is an array
    }

    notesObj.splice(index,1);
    if(notesObj.length==0){
        localStorage.clear();
    }else{
        localStorage.setItem("notes",JSON.stringify(notesObj));
    }
    showNotes();
}

let search=document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputVal=search.value.toLowerCase();
    let noteCards=document.getElementsByClassName('new_content');
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    });
});