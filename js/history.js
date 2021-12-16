$(document).ready(function () {
    try {
        const firebaseConfig = {
            apiKey: "AIzaSyC1GkiWGio-_MohFCjXEZxr2akg286nKWA",
            authDomain: "acumenfyp.firebaseapp.com",
            projectId: "acumenfyp",
            storageBucket: "acumenfyp.appspot.com",
            messagingSenderId: "982412180494",
            appId: "1:982412180494:web:eca5e3ea3ef3819abad05f",
            measurementId: "G-25G6CNZT8L"
        };

        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        //const analytics = firebase.getAnalytics(app);

        //let app = firebase.app();
        let features = [
            'auth',
            'database',
            'firestore',
            'functions',
            'messaging',
            'storage',
            'analytics',
            'remoteConfig',
            'performance',
        ].filter(feature => typeof app[feature] === 'function');
        //loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
        console.log(e);
    }

    // var user = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged(function (user) { //or use 
        if (user) {
            console.log(`User is login ${user.displayName}`);
            $(".main-header").load("./loginHeader.html");

            const db = firebase.firestore();

            var domElement = document.getElementById("user_history");


            db.collection("history").where("userId", "==", user.uid)
                .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var labels = [];
                        var labelValues = [];
                        doc.data().data.forEach(element => {
                            labels.push(element['label']);
                            labelValues.push(element['confidence']);

                        });
                        const data = {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Dataset 1',
                                    data: labelValues,
                                    backgroundColor: [
                                        '#000957',
                                        '#FFCA03',
                                        '#B85252',
                                        '#105652',
                                        '#F05454',
                                        'rgba(153, 102, 255, .6)',
                                        '#1A374D'
                                    ],
                                    // backgroundColor: Object.values(Utils.CHART_COLORS),
                                }
                            ]
                        };
                        const config = {
                            type: 'pie',
                            data: data,
                            options: {
                                responsive: true,
                                aspectRatio: 6,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Expression and Behavior report'
                                    }
                                }
                            },
                        };
                        var canvasElement = document.createElement('canvas');
                        var div = document.createElement("div");
                        div.style.height = "400px";

                        domElement.appendChild(canvasElement);
                        domElement.appendChild(div);
                        var myChart = new Chart(
                            canvasElement, config
                        );
                    });
                    // console.log(`User id is ${cities[0]}`);

                });
            // User is signed in.
        } else {
            console.log(`User is not login `);
            // No user is signed in.
            $(".main-header").load("./header.html");
        }
    });
    // $(".main-header").load("./header.html");
    $("footer").load("./footer.html");
    // loadModels();


    $(window).scroll(function () {
        var sc = $(window).scrollTop();
        if (sc > 150) {
            $("#main-navbar").addClass("navbar-scroll");
        } else {
            $("#main-navbar").removeClass("navbar-scroll");
        }
    });


});


