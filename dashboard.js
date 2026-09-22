async function updateBattery() {
    const batteryText = document.getElementById("battery");
    const batteryBar = document.getElementById("battery-bar");

    if (!navigator.getBattery) {
        batteryText.textContent = "Not available";
        return;
    }

    try {
        const battery = await navigator.getBattery();

        function update() {
            const percentage = Math.round(battery.level * 100);

            batteryText.textContent = percentage + "%";
            batteryBar.style.width = percentage + "%";

            if (battery.charging) {
                batteryText.textContent += " ⚡ Charging";
            }
        }

        update();

        battery.addEventListener("levelchange", update);
        battery.addEventListener("chargingchange", update);

    } catch (error) {
        batteryText.textContent = "Unknown";
        batteryBar.style.width = "0%";
    }
}


function updateInternet() {
    const internet = document.getElementById("internet");

    if (!navigator.onLine) {
        internet.textContent = "🔴 Offline";
        return;
    }

    if (navigator.connection) {
        const connection = navigator.connection;

        let type = connection.effectiveType || "Unknown";

        internet.textContent = "🟢 Connected • " + type.toUpperCase();
    } else {
        internet.textContent = "🟢 Connected";
    }
}
updateBattery();
updateInternet();

window.addEventListener("online", updateInternet);
window.addEventListener("offline", updateInternet);
function updateDeviceName() {
    const deviceName = document.getElementById("device-name");
    const deviceType = document.getElementById("device-type");

    const platform = navigator.userAgentData
        ? navigator.userAgentData.platform
        : navigator.platform;

    if (platform.includes("Win")) {
        deviceName.textContent = "Windows";
        deviceType.textContent = "Windows Computer";
    } else if (platform.includes("CrOS")) {
        deviceName.textContent = "Chromebook";
        deviceType.textContent = "ChromeOS Device";
    } else if (platform.includes("Mac")) {
        deviceName.textContent = "Mac";
        deviceType.textContent = "macOS Device";
    } else if (platform.includes("Linux")) {
        deviceName.textContent = "Linux";
        deviceType.textContent = "Linux Computer";
    } else {
        deviceName.textContent = "Unknown Device";
        deviceType.textContent = "Unknown Platform";
    }
}

updateDeviceName();
async function updateAudio() {
    const audio = document.getElementById("audio");

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        audio.textContent = "Unknown AUX";
        return;
    }

    try {
        const devices = await navigator.mediaDevices.enumerateDevices();

        const outputs = devices.filter(
            device => device.kind === "audiooutput"
        );

        if (outputs.length > 0) {
            audio.textContent = "🟢 Audio Output Detected";
        } else {
            audio.textContent = "Unknown AUX";
        }

    } catch (error) {
        audio.textContent = "Unknown AUX";
    }
}

updateAudio();
window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "DEVICE_STATUS_TEST") {
        console.log("Extension says:", event.data.message);

        document.getElementById("connection").textContent =
            "🟢 Extension Connected";
    }
});