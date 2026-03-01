/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */

const thalis = [
  {
    name: "Rajasthani Thali",
    items: ["dal baati", "churma", "papad"],
    price: 250,
    isVeg: true,
  },
  {
    name: "Punjabi Thali",
    items: ["butter chicken", "naan", "dal makhani"],
    price: 350,
    isVeg: false,
  },
  {
    name: "Gujarati Thali",
    items: ["dhokla", "thepla", "dal", "kadhi"],
    price: 200,
    isVeg: true,
  },
  {
    name: "South Indian Thali",
    items: ["dosa", "sambar", "chutney", "rice"],
    price: 180,
    isVeg: true,
  },
];
export function createThaliDescription(thali) {
  // Your code here
  if (typeof thali !== "object" || thali === null) {
    return "";
  }

  if (
    !thali.name ||
    !thali.items ||
    !thali.price ||
    typeof thali.isVeg !== "boolean"
  ) {
    return "";
  }
  const name = thali.name.toUpperCase();
  const isVeg = thali.isVeg ? "veg" : "Non-Veg";
  const price = thali.price.toFixed(2);
  return `${name} (${isVeg.charAt(0).toUpperCase() + isVeg.slice(1)}) - Items: ${thali.items.join(", ")} - Rs.${price}`;
}

export function getThaliStats(thalis) {
  // Your code here
  if (!Array.isArray(thalis) || thalis.length === 0) {
    return null;
  }
  const filterVeg = thalis.filter((thali) => {
    return thali.isVeg === true;
  }).length;
  const filterNonVeg = thalis.filter((thali) => {
    return thali.isVeg === false;
  }).length;

  const prices = thalis.map((thali) => {
    return thali.price;
  });

  const avgPrice =
    thalis.reduce((sum, thali) => {
      return (sum += thali.price);
    }, 0) / thalis.length;

  const cheapest = Math.min(...prices);
  const costliest = Math.max(...prices);
  const mappedThali = thalis.map((thali) => {
    return thali.name;
  });

  return {
    totalThalis: thalis.length,
    vegCount: filterVeg,
    nonVegCount: filterNonVeg,
    avgPrice: avgPrice.toFixed(2),
    cheapest,
    costliest,
    names: mappedThali,
  };
}

export function searchThaliMenu(thalis, query) {
  // Your code here
  if (!Array.isArray(thalis) || thalis.length === 0) {
    return [];
  }
  if (typeof query !== "string" || query.trim() === "") {
    return [];
  }
  const thaliFilter1 = thalis.filter((thali) => {
    return thali.name.toLowerCase().includes(query.toLowerCase());
  });
  const thaliFilter = thalis.filter((thali) => {
    return thali.items.some((item) => {
      return item.toLowerCase().includes(query.toLowerCase());
    });
  });
  console.log("thaliFilter1", thaliFilter1);
  console.log("thaliFilter", thaliFilter);

  return [...thaliFilter1, ...thaliFilter];
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here
  if (!Array.isArray(thalis) || thalis.length === 0) {
    return "";
  }
  if (typeof customerName !== "string" || customerName.trim() === "") {
    return "";
  }
  const lineItems = thalis
    .map((thali) => {
      return `- ${thali.name} x Rs.${thali.price}`;
    })
    .join("\n");
  const totalPrice = thalis.reduce((sum, thali) => {
    return sum + thali.price;
  }, 0);
  return `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${lineItems}\n---\nTotal: Rs.${totalPrice}\nItems: ${thalis.length}`;
}
// - Line item: "- ${thali name} x Rs.{price}
searchThaliMenu(thalis, "dal");
