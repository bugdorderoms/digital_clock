const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const date = document.getElementById('date');
const moonPhase = document.getElementById('moon');

//////////////////////////
// UPDATE DIGITAL CLOCK //
//////////////////////////

// Update time every second
setInterval(function TimeUpdate() {
    let dateToday = new Date();

    hours.textContent = String(dateToday.getHours()).padStart(2, '0');
    minutes.textContent = String(dateToday.getMinutes()).padStart(2, '0');
    seconds.textContent = String(dateToday.getSeconds()).padStart(2, '0');
}, 1000)

////////////////////////////////
// UPDATE DATE AND MOON PHASE //
////////////////////////////////

// Gets the current moon phase calculating the sinodic month
function GetCurrentMoonPhase(year, month, day)
{
    let yearDays, monthDays, leapYear, julianaDate, phase;
    
    year = year - Math.trunc((12 - month) / 10);

    month += 9;
    if (month >= 12)
        month -= 12;

    yearDays = 365.25 * (year + 4172);
    monthDays = Math.trunc((30.6001 * month) + 0.5);
    leapYear = Math.floor((((year / 100) + 4) * 0.75) - 38);

    julianaDate = yearDays + monthDays + day + 59;
    julianaDate -= leapYear;
    julianaDate = Math.trunc(julianaDate - 2244116.75);
    julianaDate /= 29.53;
    julianaDate -= Math.trunc(julianaDate);

    phase = Math.trunc(julianaDate * 8 + 0.5) & 7;

    switch (phase)
    {
        case 0:
            phase = 'New';
            break;
        case 1:
            phase = 'Waxing crescent';
            break;
        case 2:
            phase = 'First quarter';
            break;
        case 3:
            phase = 'Waxing gibbous';
            break;
        case 4:
            phase = 'Full';
            break;
        case 5:
            phase = 'Waning gibbous';
            break;
        case 6:
            phase = 'Last quarter';
            break;
        case 7:
            phase = 'Waning crescent';
            break;
    }
    return phase;
}

function DisplayDateAndMoonPhase(year, month, day)
{
    month++; // Month numbers starts at 0

    // Update date
    date.textContent = String(day).padStart(2, '0') + '-' + String(month).padStart(2, '0') + '-' + year;

    // Update moon phase
    moonPhase.textContent = GetCurrentMoonPhase(year, month, day);
}

// Sets a timeout to update the current date and moon phase every day
function SetDateUpdateTimeout()
{
    let dateToday = new Date();
    let night = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() + 1, 0, 0, 0);

    setTimeout(() => {
        DisplayDateAndMoonPhase(night.getFullYear(), night.getMonth(), night.getDate());
        SetDateUpdateTimeout();
    }, night.getTime() - dateToday.getTime());
}

// Initialize date and moon phase
let dateToday = new Date();
DisplayDateAndMoonPhase(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate());
SetDateUpdateTimeout();
