import { ethers } from "ethers";
import moment from "moment";
import { TextCounterItemType } from "../components/components/typography/counter";
function delay(delayTimes) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, delayTimes);
    });
}

function toBigNum(value, d = 18) {
    return ethers.utils.parseUnits(String(value), d);
}

function fromBigNum(value, d = 18) {
    try {
        return parseFloat(ethers.utils.formatUnits(value, d));
    } catch (err) {
        console.log("fromBigNum error", value);
        return 0;
    }
}

const styledAddress = (s = "") => {
    if (s && s.length > 10) return s.slice(0, 4) + "..." + s.slice(-4);
    else return s;
};

function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise<void>((res, rej) => {
            // here the magic happens
            document.execCommand("copy") ? res() : rej();
            textArea.remove();
        });
    }
}

const emailFormat = (value: string) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? `Invalid email address`
      : undefined;
  };

const isValidPassword = (string: string) => /[A-Z]/.test(string) && /[a-z]/.test(string) && /[0-9]/.test(string)

const zeroPadding = (number: number) => {
    return (number < 10 ? '0' : '') + number;
};


const convertTZ = (date?: string, tz?: string) => {
    return new Date(new Date(date || 0).toLocaleString("en-US", {timeZone: tz})); 
};
  
const convertFromISODate = (date?: string): TextCounterItemType[] => {
    const convertedDate = convertTZ(date, "Europe/Paris");
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

    const dateField = { value: `${convertedDate.getDate()}`, unit: months[convertedDate.getMonth()] || "JAN"};
    const timeField = { value: `AT ${zeroPadding(convertedDate.getHours())}:${zeroPadding(convertedDate.getMinutes())}`, unit: "GMT +1"};
    return [dateField, timeField];
};

const convertFromISODateWithFormat = (dateString: string, format: string) => {
    const date = moment(dateString).format(format);
    return date;
};

const toFixed = (input?: number, decimals?: number) => {
    return Number(input?.toFixed(decimals || 0));
}

export { 
    delay,
    toBigNum,
    fromBigNum,
    styledAddress,
    copyToClipboard,
    emailFormat,
    isValidPassword,
    convertFromISODate,
    convertFromISODateWithFormat,
    toFixed
};
