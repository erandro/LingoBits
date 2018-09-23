function clipboradCopy(copiedTextId) {
    var copyText = document.getElementById(copiedTextId);
    // the "idiom name display" id should come from the fromt end 
    copyText.select();
    document.execCommand("copy");
}

$("#clipborad_copy_button").on("click", function (event) {
    event.preventDefault();
    clipboradCopy("Idiom_name_display");
    // PUT request that add +1 to a copied colum in idioms
});