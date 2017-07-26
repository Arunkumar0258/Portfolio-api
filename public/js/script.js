var form = document.getElementById('myForm');
var form1 = document.getElementById('myForm1')

function submitForm() {



        var data = {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                phone: form.phone.value,
                password: form.password.value,
                email: form.email.value
        };

        fetch('/signup', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
        }).then(function(res) {
            if(!res.ok) console.log('Something wrong with frontend fetch.');
            else window.location = 'http://localhost:3001/';
        }).catch(function(err) {
                alert('unexpected error');
        })
}

function submitLogin() {
        var data = {
                email: form1.email.value,
                password: form1.password.value
        }

        fetch('/login', {
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
        }).then(function(json_res) {
                if (!json_res.ok) console.log('Something is wrong with server or fetch');
                else {
                    return json_res.json().then(function(ans) {
                        localStorage.token = ans.token;
                        window.location = 'http://localhost:3001/jet?token=' + ans.token;
                    })
                }
        }).catch(function(err) {
                console.log(err)
            })
}

// function logOut() {
//     if (localStorage.token)
//         localStorage.removeItem("token");
// }

function validatePhone() {
    var phone = form.phone.value;

    var phoneregex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if(phone.match(phoneregex))
        return true;
}

function validateEmail() {
    var email = form.email.value;

    var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.match(emailregex))
        return true;
}

function error(target) {
    target.style.border = '2px solid red';
}

function clearError(target) {
    target.style.border = '';
}
