// Start: Modal > Member
$(document).ready(function () {
  $("#member").click(function () {
    $("#memberModal").modal();
  });
});

$(document).ready(function () {
  $("#sidemember").click(function () {
    $("#memberModal").modal();
  });
});
// End: Modal > Member

function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function openFilter(){
  document.getElementById('myFilter').style.marginTop ='0';
}

function closeFilter(){
  document.getElementById('myFilter').style.marginTop ='250%';
}




// Start: Categories Slide-Box
$(".sub-menu ul").hide();
$(".sub-menu a").click(function () {
  $(this).parent(".sub-menu").children("ul").slideToggle("100");
  $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
});
// End: Categories Slide-Box


// Start: Navbar Transform on-scroll
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("header").style.height = "70px";
    document.getElementById("header").style.padding = "1px";
    document.getElementById("header").style.background = "white";
    document.getElementById('item-counter').style.background = 'red';
    document.getElementById('item-counter').style.color = 'white';

  } else {
    document.getElementById("header").style.height = "100px";
    document.getElementById("header").style.padding = "30px";
    document.getElementById("header").style.background = "#ffe5d8";
    document.getElementById('item-counter').style.background = 'white';
    document.getElementById('item-counter').style.color = 'red';
  }
}
// End: Navbar Transform on-scroll


// json code
$(document).ready(function () {
  var data = [];
  $.getJSON("data-catagory.json", function (items) {
    data = items;

    showImage(data);
    
  });


  //Start: Detail-Item Modal
  $(document).on("click", ".productImg", function () {
    let id = $(this).data("id");

    let product = data.filter((ele) => ele.pdid == id);

    showModal(product[0]);
    $("#showModal").modal("show");
  });
    //End: Detail-Item Modal


    //Checkbox Click
    $("input[type=checkbox]").click(function (e) 
    {
      
      
      let cats = $("#chk-cat:checked").map(function () { return $(this).val() }).toArray().toString();
      
      let bras = $("#chk-brand:checked").map(function () { return $(this).val() }).toArray().toString();
      
     
      let subdata = null;

      if(cats.length == 0)
      {
          subdata = data;
      }
      else
      {
          subdata = data.filter(item => cats.search(item.pdcatogery) >= 0);
      }
      
      if(bras.length > 0)
      {
          subdata = subdata.filter(item => bras.search(item.pdbrand) >= 0);
      }
      
      showImage(subdata); 
  });


// Start: JSON Code / truyền data từ JSON file
    function showImage(items) {
        let s = [];
        
    $.each(items, function (e, json) {
  
      s.push(`<div class="element_gifts" data-name="${json.pdname}" data-id="${json.pdid}" data-item="${json.pdcatogery}" data-brand="${json.pdbrand}" data-size="${json.pdsize}" data-weight="${json.pdweight}" data-color="${json.pdcolor}" data-price="${json.pdprice}" data-image="${json.pdimage}" src="${json.pdimage}" >
            
              <div class="image">
                  <img src="${json.pdimage}" data-id="${json.pdid}" class="productImg" alt="">
              </div>
                        
                    
              <div class="name">
                <h4><b>${json.pdname}</b></h4>
              </div>       
            
              <div class="price">
                <span>${json.pdprice}</span>
              </div>
            
            
            <hr>

            <div data-id="${json.pdid}" href="#" class="cp-btn more">
                  <i class="ti-plus"></i>     
            </div>
 
            <button data-id="${json.pdid} href="#" class="cp-btn more ">
                 <i class="ti-plus"></i>
            </button>

            <div class="btn">

                <button class="btn btn-buy-now cart-btn glyphicon glyphicon-shopping-cart">  
                </button>
            </div>
            
            <div class="btn">
                <button class="btn btn-pink btn-buy-now">
                  Add to
                <i class="glyphicon glyphicon-shopping-cart"></i>
                </button>

                <button data-id="${json.pdid} href="#" class="btn btn-black more">
                  Compare <i class="glyphicon glyphicon-plus"></i>
                </button>
            </div>
            
            <table class="item-table table">
            

            <tbody class="table-body"></tbody>
            </table>

            </div>
            
            `);
            
            
    });
    $("#products").html(s.join(" "));
    element_gifts = document.querySelectorAll(".element_gifts");
    // End: JSON CODE

    // Function Cart
    
    const btn = document.getElementsByClassName("btn-buy-now");

    const products = [];
    for(var i = 0 ; i < btn.length ; i ++)
    {
      let cartBtn = btn[i];
      cartBtn.addEventListener("click",(e)=>
      {
        
        let product = 
        {
          image: event.target.parentElement.parentElement.children[0].children[0].src,
          name: event.target.parentElement.parentElement.children[1].children[0].textContent,
          price: event.target.parentElement.parentElement.children[2].children[0].textContent,
          totalPrice: parseInt(event.target.parentElement.parentElement.children[2].children[0].textContent),
          quantity: 1 
        }
        
        
        addItemToLocal(product);
        
      });
    }

    function addItemToLocal(product)
    {
      let cartItem = JSON.parse(localStorage.getItem("prdInCart"))
      if(cartItem === null)
      {
          
        products.push(product);
          localStorage.setItem("prdInCart",JSON.stringify(products))
          
      }
      else
      {
         cartItem.forEach(item => 
         {
            if(product.name == item.name)
            {
               product.quantity = item.quantity += 1;
               product.totalPrice = item.totalPrice += product.totalPrice;
            }
            else
            {
              products.push(item);
            }
         });
         
         products.push(product);
      }
      localStorage.setItem("prdInCart", JSON.stringify(products));
      window.location.reload();
    }

    function displayCartItem()
    {
      let html = '';
      let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
      
      cartItem.forEach(item =>
      {
        html +=`
          <tbody>
            <tr>
              <td><img src="${item.image}" width="100px"></td>
              <td>${item.name}</td>
              <td>${item.price}</td>
              <td>${item.quantity}</td>
              <td>${item.totalPrice} Rs</td>
              <td class="removeItem"><ion-icon name="close-circle-outline"></ion-icon> </td>
            </tr>
          </tbody>
        `;
      });
      document.querySelector(".table-body").innerHTML = html;
      
    }
    displayCartItem();

    function cartNumberDisplay()
    {
      let cartNumbers = 0;
      let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
      cartItem.forEach(item => 
      {
         cartNumbers = item.quantity += cartNumbers;
        
      });
      
     document.querySelector("#item-counter").textContent = cartNumbers;
      
    }
    cartNumberDisplay();

    const removeItem = document.getElementsByClassName("removeItem");
    
    for(var i = 0 ; i < removeItem.length ; i ++)
    {
      let removeBtn = removeItem[i]
      removeBtn.addEventListener("click", () =>
      {
         let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
         
         cartItem.forEach(item => 
          {
            
            if(item.name != event.target.parentElement.parentElement.children[1].textContent)
            {
               products.push(item);
            }
            
            

         });
         localStorage.setItem("prdInCart", JSON.stringify(products));
         window.location.reload();
      });
    }

    function subTotal()
    {
      let subtotal = 0;
      let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
      cartItem.forEach(item => {
          subtotal = item.totalPrice += subtotal;
      });

      document.querySelector(".priceView").textContent = subtotal
    }
    subTotal();
  }



//START COMPARE
  var list = [];

  $(document).on("click", ".more", function () {
    $(".comparePanle").show();
    $(this).toggleClass("rotateBtn");
    $(this).parents(".element_gifts").toggleClass("selected");
    var productID = $(this).parents(".element_gifts").attr("data-id");

    var inArray = $.inArray(productID, list);

    if (inArray < 0) {
      if (list.length < 3) {
        list.push(productID);

        var displayTitle = $(this).parents(".element_gifts").attr("data-name");

        // let image = $(this).siblings(".productImg").attr("src");
        // console.log(image);
        let image = $(this).parents(".element_gifts").attr("src");
        $(".comparePan").append(
          '<div id="' +
            productID +
            '"class="relPos titleMargin w3-margin-bottom col-lg-4 col-md-4 col-sm-4 col-xs-4"><div class="w3-white titleMargin"><a class="selectedItemCloseBtn w3-closebtn pointer-cursor">&times</a><img src="' +
            image +
            '" alt="image" style="width: 100%"/><p id="' +
            productID +
            '" class="titleMargin1">' +
            displayTitle +
            "</p> </div></div>"
        );
      } else {
        $("#WarningModal").modal();

        $(this).toggleClass("rotateBtn");
        $(this).parents(".element_gifts").toggleClass("selected");
        
        return;
      }
    } else {
      list.splice($.inArray(productID, list), 1);
      $("#" + productID).remove();
      hideComparePanel();
    }

    if (list.length > 1) {
      $(".cmprBtn").addClass("active");
      $(".cmprBtn").removeAttr("disabled");
    } else {
      $(".cmprBtn").removeClass("active");
      $(".cmprBtn").attr("disabled", "");
    }
  });

  /*function Click button Compare then show comparision*/
  $(document).on("click", ".cmprBtn", function () {
    if ($(".cmprBtn").hasClass("active")) {
      /* this is to print the  features list statically*/
      $(".contentPop").append(
        '<div class="col-sm-3 col-md-3 compareItemParent relPos">' +
          '<ul class="product">' +
                '<li class="relPos compHeader"></li>' +
                "<li><b>Name</b></li>" +
                "<li><b>Item</b></li>" +
                "<li><b>Size</b></li>" +
                "<li><b>Weight</b></li>" +
                "<li><b>Color</b></li>" +
                "<li><b>Price</b></li>"+
            "</ul>" +
          "</div>"
      );

      for (var i = 0; i < list.length; i++) {
        /* this is to add the items to popup which are selected for comparision */
        product = $('.element_gifts[data-id="' + list[i] + '"]');
        var image = $("[data-id=" + list[i] + "]")
          .find(".productImg")
          .attr("src");
          
        var title = $("[data-id=" + list[i] + "]").attr("data-name");
        /*appending to div*/
        $(".contentPop").append(
          '<div class="col-sm-3 col-md-3 compareItemParent relPos">' +
                '<ul class="product">' +
                    '<li class="compHeader"><img src="' + image +'" class="compareThumb"></li>' 
                    +
                    "<li>" + title + "</li>" 
                    +
                    "<li>" + $(product).data("item") + "</li>" 
                    +
                    "<li>" + $(product).data("size") + "</li>" 
                    +
                    "<li>" + $(product).data("weight") + "</li>"
                    + 
                    "<li>" + $(product).data("color") + "</li>" 
                    +
                    "<li>" + $(product).data("price") + "</li>" 
                    +
                "</ul>" +
            "</div>"
        );
      }
    }
    $(".modPos").show();
  });

  /* function to close the comparision popup */
  $(document).on("click", ".closeBtn", function (e) {
    
    $(".contentPop").empty();
    $(".comparePan").empty();
    $(".comparePanle").hide();
    $(".modPos").hide();
    $(".selectProduct").removeClass("selected");
    
    $(".cmprBtn").attr("disabled", "");
    list.length = 0;
    $(".rotateBtn").toggleClass("rotateBtn");
  });

  /*function to remove item from preview panel*/
  $(document).on("click", ".selectedItemCloseBtn", function (e) {
    
    
    var test = $(this).siblings("p").attr("id");
    
    $("[data-id=" + test + "]").find(".more").click();
    hideComparePanel();
  });

  function hideComparePanel() {
    if (!list.length) {
      
      $(".comparePan").empty();
      $(".comparePanle").hide();
    }
  }
  //END COMPARE

  
});


//Modal Item
function showModal(json) {
  let s = `
    <div class="row">
        <div class="col-sm-7 col-md-7 col-lg-7">
            <div><img src="${json.pdimage}" style="width: 95%; border: 3px solid black"  alt=""></div>
        </div>
        <div class="col-sm-5 col-md-5 col-lg-5 modal-item-detail">
            <h3 style="color: black; text-align: center;"><b>${json.pdname}</b></h3>
            <hr>
            <p><b>Price:</b> ${json.pdprice}</p>
            <p><b>ID:</b> ${json.pdid}</p>
            <p><b>Catogery:</b> ${json.pdcatogery}</p>
            <p><b>Brands:</b> ${json.pdbrand}</p>
            <p><b>Material:</b> ${json.pdmaterial}</p>
            <p><b>Color:</b> ${json.pdcolor}</p>
            <p><b>Size:</b> ${json.pdsize}</p>
            <p><b>Weight:</b> ${json.pdweight}</p>
            <p><b>Package:</b> ${json.pdpackage}</p>
            <p><b>Details:</b> ${json.pdspec}</p>
            
        </div>
    </div>           
    `;

  $(".modal-item").html(s);
}

//START FILTER CATEGORIES

var element_gifts = document.querySelectorAll(".element_gifts");
const filter_button = document.querySelectorAll("#filter_button .filter");

const filter_brand = document.querySelectorAll(".filter-brand");


//FILLTER BY EVENT CLICK id#filter_button

filter_button.forEach(function (e) {
  e.addEventListener("click", function (e1) {
    
    //Click to get data filter
    let button_filter = e1.target.dataset.filter;
    
    element_gifts.forEach(function (e2) {
      
      let element_filter = e2.dataset.item;

      if (button_filter === element_filter || button_filter === "all") {
        e2.style.display = "block";
      } else {
        e2.style.display = "none";
      }
    });
  });
});

//FILTER BY BRANDS
filter_brand.forEach(function (e) {
  e.addEventListener("click", function (e1) {
    let button_brand = e1.target.dataset.filter;
    
    element_gifts.forEach(function (e2) {
      let element_filter = e2.dataset.brand;
      

      if (button_brand === element_filter || button_brand === "all") {
        e2.style.display = "block";
      } else {
        e2.style.display = "none";
      }
    });
  });
});


// Contact Page
$(document).ready(function(e)
{
  $("#form1").submit(function(e)
  {
    e.preventDefault();

    let name = $("#name").val();
    let email = $("#email").val();
    let message = $("#message").val();
    let re = /^[\w\-\.]+@([\w\-]+\.)+[a-zA-Z]{2,4}$/g;
    if(!re.test(email))
    {
        alert("Format email Invallid !!! ( abc@abc.com )")
        $("#email").focus();
        return false;
    }
    let s = [];

    s.push(`Your Information !!!`);
    s.push(`=============================`);
    s.push(`Your Name: ${name}`);
    s.push(`Email: ${email}`);
    s.push(`Comment: ${message}`);
    s.push(`=============================`);
    s.push(`Thanks for sending message for us, we will reply you as soon as possible !!!`);

    let sbill = s.join("\n");
    alert(sbill);
  });
});

function show(obj)
{
  obj.style.backgroundColor="#ffe5d8";
}
  function hide(obj)
{
  obj.style.backgroundColor="#FFFFFF";
}

// End Contact Page

// Payment Page
$(document).ready(function(e)
{
  $("#form2").submit(function(e)
  {
    e.preventDefault();

    let name = $("#name").val();
    let email = $("#email").val();
    
    
    let re = /^[\w\-\.]+@([\w\-]+\.)+[a-zA-Z]{2,4}$/g;
    if(!re.test(email))
    {
        alert("Format email Invallid !!! ( abc@abc.com )")
        $("#email").focus();
        return false;
    }

    let credit = $("#credit").val();
    let creditcheck = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if(!creditcheck.test(credit))
    {
      alert("Invalid Credit Card Number !!! Format is xxxx-xxxx-xxxx-xxxx, x is a digit.");
      $("#credit").focus();
      return false;
    }
    let s = [];

    s.push(`Payment Successful ! We will ship for you as soon as possible !!!`);

    let sbill = s.join("\n");
    alert(sbill);
  });
});

function show2(obj)
{
  obj.style.backgroundColor="yellow";
}
  function hide2(obj)
{
  obj.style.backgroundColor="#FFFFFF";
}

// End Payment Page