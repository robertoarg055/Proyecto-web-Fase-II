function showLogin(type) {
    const forms = document.querySelectorAll('.login-form');
    const buttons = document.querySelectorAll('.tab-btn');

    forms.forEach(form => form.classList.add('hidden'));
    document.getElementById(`login-${type}`).classList.remove('hidden');

    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-btn[onclick="showLogin('${type}')"]`).classList.add('active');
}
