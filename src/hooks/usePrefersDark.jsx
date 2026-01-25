import { useEffect, useState } from 'react';


export default function usePrefersDark(initial = false) {
const [dark, setDark] = useState(() => {
try {
const raw = localStorage.getItem('prefers-dark');
return raw ? JSON.parse(raw) : initial;
} catch {
return initial;
}
});


useEffect(() => {
document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
localStorage.setItem('prefers-dark', JSON.stringify(dark));
}, [dark]);


return [dark, setDark];
}