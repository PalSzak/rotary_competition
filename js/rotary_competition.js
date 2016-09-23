
function serializeForm() {
  return $('#competition_form').serialize();
};

function getUrlVars()
{
    var vars = [], hash;

    if(window.location.href.indexOf('?') != -1){
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

      for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }

    }
    return vars;
}

function clearForm(){
  //because of browser cache
  $("input[type=text], textarea").val("");
}

function prepareString(input){
  return decodeURIComponent(input.replace(/\+/g, '%20'));
}

function prepopulateForm(submittedValues) {
  jQuery.each( submittedValues, function(idx, value){
    var element = $('#' + value);
    if(element.is('span')){
      element.text(prepareString(submittedValues[value]));
    } else {
      element.val(prepareString(submittedValues[value]));
    }
  });
}

function markCompetitionTabActive(){
  $('#menu a[href="#competition"]').tab('show')
}

function initHome() {
  submittedValues = getUrlVars();

  clearForm();
  prepopulateForm(submittedValues);

  if(submittedValues.length > 0){
    markCompetitionTabActive();
  }

  $('#menu a').click(function(e) {
    e.preventDefault()
    $(this).tab('show');
  })

  $('#generate_link').click( function() {
    $('#generated_link').val("http://" + window.location.host + window.location.pathname + "/?" + serializeForm() );
  })

  $('#print').click( function() {
    window.location.replace("http://" + window.location.host + window.location.pathname + "/print.html?" + serializeForm());
  });
}

function initPrint() {
  prepopulateForm(getUrlVars());
}
