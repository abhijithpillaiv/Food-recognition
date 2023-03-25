module.exports = {
    getData: (data) => {
        var hdetails={bmr:0,idealBodyWeight:0,bmi:0,amr:0}
        var cneed={bal:0,mwl:0,mwg:0,hwl:0,hwg:0}
        if (data.gender == 'Male') {
            hdetails.bmr=Math.trunc(88.362 + (13.397 * data.weight) + (4.799 * data.height) - (5.677 * data.age))
            hdetails.idealBodyWeight=Math.trunc(50 + (0.91 * (data.height - 152.4)))
        } else {
            hdetails.bmr=Math.trunc(447.593 + (9.247 * data.weight) + (3.098 * data.height) - (4.330 * data.age))
            hdetails.idealBodyWeight=Math.trunc(45.5 + (0.91 * (data.height - 152.4)))
        }
        hdetails.bmi=Math.trunc(data.weight / ((data.height / 100) * (data.height / 100)))
        if (hdetails.bmr) {
            if (data.activity == 'sedentary') {
                hdetails.amr=hdetails.bmr * 1.2
            }
            else if (data.activity == 'light') {
                hdetails.amr=hdetails.bmr * 1.375
            }
            else if (data.activity == 'moderate') {
                hdetails.amr=hdetails.bmr * 1.55
            }
            else if (data.activity == 'active') {
                hdetails.amr=hdetails.bmr * 1.725
            }
            else if (data.activity == 'extreme') {
                hdetails.amr=hdetails.bmr * 1.9
            }
            else {
                hdetails.amr=0
            }
        }
        if (hdetails.amr) {
            cneed.bal=Math.trunc(hdetails.amr)
            cneed.mwl=Math.trunc(hdetails.amr) - 200
            cneed.mwg=Math.trunc(hdetails.amr) + 200
            cneed.hwl=Math.trunc(hdetails.amr) - 500
            cneed.hwg=Math.trunc(hdetails.amr) + 500
        }
        return({'hdetails':hdetails,'cneed':cneed})
    }
}