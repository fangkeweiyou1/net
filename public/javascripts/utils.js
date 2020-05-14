var localIp="192.168.1.3";

function getLocalIpAll() {
    return "http://" + localIp + ":8000/"
}

/**
 * 获取局域网ip
 * @returns {boolean}
 */
function ip_local(callback) {
    if (localIp != null) {
        callback(localIp);
    } else {
        var ip = false;
        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || false;

        if (window.RTCPeerConnection) {
            ip = [];
            var pc = new RTCPeerConnection({iceServers: []}), noop = function () {
            };
            pc.createDataChannel('');
            pc.createOffer(pc.setLocalDescription.bind(pc), noop);

            pc.onicecandidate = function (event) {
                if (event && event.candidate && event.candidate.candidate) {
                    var s = event.candidate.candidate.split('\n');
                    ip.push(s[0].split(' ')[4]);
                    localIp = ip[0];
                    callback(localIp);
                }
            }
        }

    }
}