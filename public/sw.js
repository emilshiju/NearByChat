
this.addEventListener('push', function(e) {
    console.log("respen vanuuuuuuuuuuuuuuuu")
    const data = e.data.json();
    this.registration.showNotification(
        data.title,
        {
            body: data.body,
        }
    );
})