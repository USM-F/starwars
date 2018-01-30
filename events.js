$(window).load(function()
    {
      $('#back').fadeTo(0, 0); $('#arrow-left').hide(); $('#arrow-right').hide();
      custom_state();
    });

$(document).ready(function ()
{
//logotype click event
    $("#logotype").click(function () {$(window).load();});
/*logotype click event end*/

/* click event*/
    $("#page-bottom").on("click", "div", function ()
    {
        var commander_id = $(this).find('input').val();
        var commanderPosition;
        draw(find_direct_subs(empire, commander_id), find_position(empire, commander_id));

        $('#back').fadeTo(0, 1); $('#arrow-left').show(); $('#arrow-right').show();
    });
/* click event end*/

/* back event*/
    $("#page-top").on("click", "#back", function ()
    {
      var commander_id = $("#page-top").find('input').val();
      var commanderPosition = 0;
      //find position of boss
      commanderPosition = find_position(empire, commander_id);
      if ((empire[commanderPosition].name == 'Darth Vader') || (empire[commanderPosition].name == 'Darh Sidius'))
      { $(window).load(); }
      else
      {
        //replace boss
        for(i in empire)
        {
          if(empire[i].id == empire[commanderPosition].parent) { commander_id = empire[i].id; }
        }
        draw(find_direct_subs(empire, commander_id), find_position(empire, commander_id));
      }
    });
/* back event end*/

    var arrow = 0;

/* arrow events*/
    $("#page-top").on("click", "#arrow-left", function ()
    {
    var commander_id = $("#page-top").find('input').val();
    var commanderPosition = 0;
    var commanderEqual = [];
    //find position of boss
    commanderPosition = find_position(empire, commander_id);
    for (i = 0; i < empire.length ; i++)
    {
      if (empire[i].parent == empire[commanderPosition].parent)
        { commanderEqual[commanderEqual.length] = empire[i]; }
    }

    if (arrow < 0) { arrow = commanderEqual.length-1; }
    if (commander_id == commanderEqual[arrow].id) { arrow--; }
    if (arrow < 0) { arrow = commanderEqual.length-1; }

    commander_id = commanderEqual[arrow].id;
    draw(find_direct_subs(empire, commander_id), find_position(empire, commander_id));
    });

    $("#page-top").on("click", "#arrow-right", function ()
    {
      var commander_id = $("#page-top").find('input').val();
      var commanderPosition = 0;
      var commanderEqual = [];
      //find position of boss
      commanderPosition = find_position(empire, commander_id);

      for(i = 0; i < empire.length ; i++)
      {
        if (empire[i].parent == empire[commanderPosition].parent)
          { commanderEqual[commanderEqual.length] = empire[i]; }
      }

      if (arrow>(commanderEqual.length-1)) { arrow = 0; }
      if (commander_id == commanderEqual[arrow].id) { arrow++; }
      if (arrow>(commanderEqual.length-1)) { arrow = 0; }

      commander_id = commanderEqual[arrow].id;
      draw(find_direct_subs(empire, commander_id), find_position(empire, commander_id));
    });
/* arrow events end*/
});

// functions are here
function find_subs(data, id_)
{
var count = 0;
  for (index in data)
  {
    if (data[index].parent == id_)
    { count++; count+= find_subs(data, data[index].id); }
  }
return count;
}

//find position from id
function find_position(data, id_)
{
var position = 0;
  for (index in data)
  { if (data[index].id == id_) { position = index; } }
return position;
}

//find direct employers
function find_direct_subs(data, id_)
{
var direct_sub = [];
  for (index in data)
  {
    if(data[index].parent == id_) { direct_sub[direct_sub.length] = data[index]; }
  }
  return direct_sub;
}

//draw objects
function draw(sub, commanderPosition)
{
var subTable = '';
//avatar top
$('#page-top .avatar img').attr('src', 'assets/avatars/' + empire[commanderPosition].image);
$('#page-top .avatar h1').text(empire[commanderPosition].name);
$('#page-top .avatar p').text(empire[commanderPosition].post);
$('#page-top .person-id').val(empire[commanderPosition].id);
//free page-bottom
$("#page-bottom").empty();

//create divs with employers
  for(i = 0; i < sub.length ; i++)
  {
    subsCount = find_subs(empire, sub[i].id);
    if (subsCount == 0) {subsCount = '<div class="quantless"><p>' + subsCount + '</p></div>';}
    else {subsCount = '<div class="quantity"><p>' + subsCount + '</p></div>';}

    if(i % 2 == 0)
    {
        subTable+= '<div class="avatar-left"><input type="hidden" class="person-id" value="' + sub[i].id + '">'
        + subsCount
        +'<img src="assets/avatars/' + sub[i].image + '"align = "left"><h1>' + sub[i].name + '</h1>'
        + '<p>' + sub[i].post +'</p></div>';
    }
    else
    {
        subTable+= '<div class="avatar-right"><input type="hidden" class="person-id" value="' + sub[i].id + '">'
        + subsCount
        +'<img src="assets/avatars/' + sub[i].image + '"align = "left"><h1>' + sub[i].name + '</h1>'
        + '<p>' + sub[i].post +'</p></div>';
    }
  }
  $('#page-bottom').append(subTable);

return true;
}

//custom state of page
function custom_state()
{
var default_div = ''
var commanderPosition = 0;
  $('#page-top .avatar img').attr('src', 'assets/avatars/empire.png');
  $('#page-top .avatar h1').text('Galactic Empire');
  $('#page-top .avatar p').text('Imperial millitary');
  $('#page-top .person-id').val(undefined);
  //free page-bottom
  $("#page-bottom").empty();

  commanderPosition = find_position(empire, 15); //Sidius
  subsCount = find_subs(empire, empire[commanderPosition].id)
  if (subsCount == 0) {subsCount = '<div class="quantless"><p>' + subsCount + '</p></div>';}
  else {subsCount = '<div class="quantity"><p>' + subsCount + '</p></div>';}

  default_div+= '<div class="avatar-left"><input type="hidden" class="person-id" value="' + empire[commanderPosition].id + '">'
  + subsCount
  +'<img src="assets/avatars/' + empire[commanderPosition].image + '"align = "left"><h1>' + empire[commanderPosition].name + '</h1>'
  + '<p>' + empire[commanderPosition].post +'</p></div>';

  commanderPosition = find_position(empire, 1); //weider
  subsCount = find_subs(empire, empire[commanderPosition].id)
  if (subsCount == 0) {subsCount = '';}
    else {subsCount = '<div class="quantity"><p>' + subsCount + '</p></div>';}

  default_div+= '<div class="avatar-right"><input type="hidden" class="person-id" value="' + empire[commanderPosition].id + '">'
  + subsCount
  +'<img src="assets/avatars/' + empire[commanderPosition].image + '"align = "left"><h1>' + empire[commanderPosition].name + '</h1>'
  + '<p>' + empire[commanderPosition].post +'</p></div>';

  $('#page-bottom').append(default_div);

return true;
}
