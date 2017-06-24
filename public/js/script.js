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
            if(!res.ok) console.log('working fine');
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
