$( document ).ready(function() {

  $("#submit").click(function(e) {
    converter($("#srt_raw").val());
    e.preventDefault();
    return false;
  });

});

function converter(text) {
  var result = ""
  var parts = text.split("\n\n");

  parts.forEach(function(part, i) {
    var elements = part.split("\n");
    var r = "";
    r += "<sub" + elements[0] + "><" + (elements.length - 2).toString() + "l>\n";
    r += "<t>" + elements[1] + "</t>\n";
    var counter = 0;
    elements.forEach(function(line, j) {
      if (j < 2) {
        return;
      }
      r += "<cpl" + line.length + ">" + line + "\n";
      counter += line.length;
    });
    var time = elements[1].split(" --> ");
    var init_time = new Date("01/01/2007 " + time[0].substr(0, time[0].length - 4));
    var end_time = new Date("01/01/2007 " + time[1].substr(0, time[1].length - 4));
    var seconds = (end_time.getTime() - init_time.getTime())/1000;
    r += "<veloc_leg " + counter + "c/" + seconds + "s " + (counter/seconds).toString() + ">\n";
    r += "</sub" + elements[0] + ">\n\n";
    result += r
  });

  $("#srt_final").val(result)

}
