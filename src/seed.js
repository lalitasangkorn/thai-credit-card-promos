// src/seed.js
// แคตตาล็อกบัตรเครดิตหลักของธนาคารไทย (รวบรวมด้วยมือ — curated)
// ใช้เป็นข้อมูลหลักที่แสดงเสมอ และเป็น fallback เมื่อ scrape ไม่สำเร็จ
//
// *** เงินเดือนขั้นต่ำอ้างอิงเกณฑ์ทั่วไปของแต่ละบัตร (ข้อมูล ณ ปี 2568/2025) ***
// *** เงื่อนไขจริงอาจเปลี่ยนแปลง โปรดตรวจสอบกับธนาคารก่อนสมัครทุกครั้ง ***
// แต่ละรายการ: { title, summary, minSalary, categories }

export const SEED = {
  kbank: [
    { title: "บัตรเครดิตแพลทินัม กสิกรไทย", summary: "บัตรหลักสะสมคะแนน K Point ใช้ได้ทุกหมวด ฟรีค่าธรรมเนียมรายปีตามเงื่อนไข", minSalary: 15000, categories: ["points", "shopping"] },
    { title: "บัตรเครดิตไทเทเนียม กสิกรไทย", summary: "บัตรเริ่มต้นสำหรับช้อปปิ้งและใช้จ่ายทั่วไป สะสมคะแนน", minSalary: 15000, categories: ["shopping", "points"] },
    { title: "บัตรเครดิตกสิกรไทย-ช้อปปี้ (KBank-Shopee)", summary: "เครดิตเงินคืนและคอยน์เมื่อช้อปบน Shopee และใช้จ่ายออนไลน์", minSalary: 15000, categories: ["online", "cashback"] },
    { title: "บัตรเครดิต JOURNEY กสิกรไทย", summary: "สะสมไมล์/คะแนนเพื่อการเดินทาง เหมาะกับสายท่องเที่ยว", minSalary: 15000, categories: ["travel", "points"] },
    { title: "บัตรเครดิตกสิกรไทย เพื่อผู้ประกอบการ แพลทินัม", summary: "บัตรสำหรับเจ้าของกิจการ เครดิตเงินคืนค่าใช้จ่ายธุรกิจ", minSalary: 50000, categories: ["cashback", "shopping"] },
    { title: "บัตรเครดิต World Rewards กสิกรไทย", summary: "บัตรระดับบน สิทธิ์ร้านอาหาร ท่องเที่ยว และสะสมคะแนนพิเศษ", minSalary: 50000, categories: ["travel", "dining", "points"] },
    { title: "บัตรเครดิต WISDOM กสิกรไทย", summary: "บัตรพรีเมียม สิทธิ์ห้องรับรองสนามบินและบริการระดับสูง", minSalary: 100000, categories: ["travel", "points"] },
    { title: "บัตรเครดิตเดอะพรีเมียร์ กสิกรไทย", summary: "บัตรสำหรับลูกค้า The Premier สิทธิ์เดินทางและไลฟ์สไตล์ระดับสูงสุด", minSalary: 100000, categories: ["travel", "points"] },
  ],
  scb: [
    { title: "บัตรเครดิต SCB VISA Classic", summary: "บัตรเริ่มต้นใช้จ่ายทั่วไป สะสมคะแนน SCB Rewards", minSalary: 15000, categories: ["shopping", "points"] },
    { title: "บัตรเครดิต SCB Gold", summary: "บัตรทองสำหรับช้อปปิ้งและใช้จ่ายประจำวัน", minSalary: 15000, categories: ["shopping", "points"] },
    { title: "บัตรเครดิต SCB M VISA (เดอะมอลล์)", summary: "สิทธิ์ช้อปที่เดอะมอลล์/พารากอน สะสม M Point", minSalary: 15000, categories: ["shopping", "points"] },
    { title: "บัตรเครดิต SCB PLANET", summary: "บัตรสายเที่ยวต่างประเทศและช้อปออนไลน์ อัตราแลกเงินดี", minSalary: 15000, categories: ["travel", "online"] },
    { title: "บัตรเครดิตไทยพาณิชย์ โตโยต้า", summary: "บัตรร่วมโตโยต้า สิทธิ์บริการรถยนต์และเครดิตเงินคืน", minSalary: 15000, categories: ["cashback", "shopping"] },
    { title: "บัตรเครดิต SCB UP2ME", summary: "ผ่อน 0% และเครดิตเงินคืน ปรับสิทธิ์ได้ตามไลฟ์สไตล์", minSalary: 15000, categories: ["installment", "cashback"] },
    { title: "บัตรเครดิต SCB Beyond / Platinum", summary: "บัตรระดับบน สิทธิ์ร้านอาหารและท่องเที่ยว", minSalary: 50000, categories: ["travel", "dining"] },
    { title: "บัตรเครดิต SCB PRIME", summary: "บัตรสำหรับลูกค้า SCB PRIME สิทธิ์เดินทางและไลฟ์สไตล์", minSalary: 100000, categories: ["travel", "points"] },
    { title: "บัตรเครดิต SCB FIRST", summary: "บัตรพรีเมียมสูงสุดสำหรับลูกค้า Wealth สิทธิ์ระดับสูง", minSalary: 100000, categories: ["travel", "points"] },
  ],
  krungsri: [
    { title: "บัตรเครดิตกรุงศรี วีซ่า/มาสเตอร์การ์ด", summary: "บัตรเริ่มต้นใช้จ่ายทั่วไป สะสมคะแนนกรุงศรี", minSalary: 15000, categories: ["shopping", "cashback"] },
    { title: "บัตรเครดิตกรุงศรี แพลทินัม", summary: "สะสมคะแนนและสิทธิ์ผ่อน 0% ที่ร้านค้าร่วมรายการ", minSalary: 15000, categories: ["points", "installment"] },
    { title: "บัตรเครดิตกรุงศรี เลดี้ ไทเทเนียม", summary: "บัตรสำหรับผู้หญิง สิทธิ์ร้านอาหาร ความงาม และช้อปปิ้ง", minSalary: 15000, categories: ["dining", "health", "shopping"] },
    { title: "บัตรเครดิตกรุงศรี นาว แพลทินัม (NOW)", summary: "เครดิตเงินคืนสายกิน ช้อปออนไลน์ และความบันเทิง", minSalary: 15000, categories: ["dining", "online", "cashback"] },
    { title: "บัตรเครดิตกรุงศรี เจซีบี แพลทินัม", summary: "สิทธิ์พิเศษที่ญี่ปุ่นและร้านค้า JCB ทั่วโลก", minSalary: 15000, categories: ["travel", "points"] },
    { title: "บัตรเครดิตกรุงศรี ซิกเนเจอร์", summary: "บัตรระดับบน สิทธิ์ห้องรับรอง ท่องเที่ยว และสะสมคะแนน", minSalary: 70000, categories: ["travel", "dining", "points"] },
    { title: "บัตรเครดิตกรุงศรี เอ็กซ์คลูซีฟ ซิกเนเจอร์", summary: "บัตรพรีเมียม (Invitation) สิทธิ์เดินทางและไลฟ์สไตล์ระดับสูงสุด", minSalary: 100000, categories: ["travel", "points"] },
  ],
  ktc: [
    { title: "บัตรเครดิต KTC VISA/Mastercard Classic", summary: "บัตรเริ่มต้น สะสมคะแนน KTC FOREVER ฟรีค่าธรรมเนียมตลอดชีพ", minSalary: 15000, categories: ["shopping", "points"] },
    { title: "บัตรเครดิต KTC CASH BACK PLATINUM", summary: "เครดิตเงินคืนทุกการใช้จ่าย ฟรีค่าธรรมเนียมตลอดชีพ", minSalary: 15000, categories: ["cashback"] },
    { title: "บัตรเครดิต KTC VISA PLATINUM", summary: "บัตรแพลทินัมสะสมคะแนน สิทธิ์ผ่อน 0% และส่วนลดร้านค้า", minSalary: 15000, categories: ["points", "installment"] },
    { title: "บัตรเครดิต KTC X Visa Signature", summary: "สายเที่ยวและช้อปออนไลน์ คะแนนคุ้มและสิทธิ์ท่องเที่ยว", minSalary: 15000, categories: ["travel", "online", "points"] },
    { title: "บัตรเครดิต KTC JCB PLATINUM", summary: "สิทธิ์พิเศษที่ญี่ปุ่นและร้าน JCB สะสมคะแนน", minSalary: 15000, categories: ["travel", "points"] },
    { title: "บัตรเครดิต KTC - Bangchak", summary: "เครดิตเงินคืนเมื่อเติมน้ำมันบางจาก", minSalary: 15000, categories: ["fuel", "cashback"] },
    { title: "บัตรเครดิต KTC PROUD", summary: "บัตรผ่อนสินค้าและกดเงินสด แบ่งจ่ายสบาย", minSalary: 15000, categories: ["installment"] },
    { title: "บัตรเครดิต KTC ROYAL ORCHID PLUS", summary: "สะสมไมล์การบินไทย เหมาะกับนักเดินทาง", minSalary: 50000, categories: ["travel", "points"] },
    { title: "บัตรเครดิต KTC VISA SIGNATURE", summary: "บัตรระดับบน สิทธิ์ร้านอาหาร ท่องเที่ยว และห้องรับรอง", minSalary: 50000, categories: ["travel", "dining", "points"] },
  ],
  bbl: [
    { title: "บัตรเครดิตแพลทินัม ธนาคารกรุงเทพ", summary: "บัตรหลักสะสมคะแนน Thank You Rewards ใช้จ่ายทั่วไป", minSalary: 15000, categories: ["shopping", "points"] },
    { title: "บัตรเครดิตไทเทเนียม ธนาคารกรุงเทพ", summary: "บัตรเริ่มต้นสำหรับช้อปปิ้งและใช้จ่ายประจำวัน", minSalary: 15000, categories: ["shopping"] },
    { title: "บัตรเครดิตแอร์เอเชีย ธนาคารกรุงเทพ", summary: "สะสมคะแนน BIG Points แลกตั๋วบินแอร์เอเชีย", minSalary: 15000, categories: ["travel", "points"] },
    { title: "บัตรเครดิตวีซ่า ซิกเนเจอร์ ธนาคารกรุงเทพ", summary: "บัตรระดับบน สิทธิ์ร้านอาหารและท่องเที่ยว", minSalary: 50000, categories: ["travel", "dining"] },
    { title: "บัตรเครดิตแพลทินัม ลีดเดอร์ชิป ธนาคารกรุงเทพ", summary: "สิทธิ์พิเศษสำหรับลูกค้าองค์กรและผู้บริหาร", minSalary: 50000, categories: ["points", "travel"] },
    { title: "บัตรอินฟินิท ธนาคารกรุงเทพ (Visa Infinite)", summary: "บัตรพรีเมียมสูงสุด สิทธิ์เดินทางและบริการระดับโลก", minSalary: 100000, categories: ["travel", "points"] },
  ],
  ttb: [
    { title: "บัตรเครดิต ttb so smart", summary: "เครดิตเงินคืนทุกการใช้จ่าย ไม่ต้องลงทะเบียน", minSalary: 15000, categories: ["cashback"] },
    { title: "บัตรเครดิต ttb so fast", summary: "เน้นช้อปออนไลน์และผ่อน 0% รับเครดิตเงินคืนออนไลน์", minSalary: 15000, categories: ["online", "installment"] },
    { title: "บัตรเครดิต ttb so chill", summary: "เครดิตเงินคืนสายกิน เที่ยว และความบันเทิง", minSalary: 15000, categories: ["dining", "cashback", "travel"] },
    { title: "บัตรเครดิต ttb global house", summary: "ผ่อน 0% และส่วนลดที่โกลบอลเฮ้าส์", minSalary: 15000, categories: ["shopping", "installment"] },
    { title: "บัตรเครดิต ttb royal orchid plus", summary: "สะสมไมล์การบินไทยทุกการใช้จ่าย", minSalary: 15000, categories: ["travel", "points"] },
    { title: "บัตรเครดิต ttb absolute", summary: "บัตรระดับบน สิทธิ์ท่องเที่ยวและไลฟ์สไตล์", minSalary: 75000, categories: ["travel", "points"] },
    { title: "บัตรเครดิต ttb reserve signature", summary: "บัตรพรีเมียมสูงสุด สิทธิ์ห้องรับรองและบริการระดับสูง", minSalary: 100000, categories: ["travel", "points"] },
  ],
  uob: [
    { title: "บัตรเครดิต UOB ONE", summary: "เครดิตเงินคืนทุกการใช้จ่ายและสายกิน", minSalary: 15000, categories: ["cashback", "dining"] },
    { title: "บัตรเครดิต UOB YOLO Platinum", summary: "เครดิตเงินคืนสายกิน เที่ยว ช้อปออนไลน์ และความบันเทิง", minSalary: 15000, categories: ["dining", "travel", "online", "cashback"] },
    { title: "บัตรเครดิต UOB World", summary: "บัตรสายเที่ยวและไลฟ์สไตล์ สะสมคะแนนคุ้ม", minSalary: 15000, categories: ["travel", "dining", "points"] },
    { title: "บัตรเครดิต UOB Black", summary: "สะสมคะแนนสายกินและไลฟ์สไตล์ในเมือง", minSalary: 15000, categories: ["dining", "points"] },
    { title: "บัตรเครดิต UOB Preferred Platinum", summary: "สะสมคะแนน UNI$ ช้อปปิ้งและร้านค้าร่วมรายการ", minSalary: 15000, categories: ["shopping", "points"] },
    { title: "บัตรเครดิต UOB Lady's", summary: "บัตรสำหรับผู้หญิง สิทธิ์ช้อปปิ้งและร้านอาหาร", minSalary: 15000, categories: ["shopping", "dining"] },
    { title: "บัตรเครดิต UOB PRIVIMILES", summary: "สะสมไมล์เดินทางรวดเร็ว เหมาะกับนักเดินทาง", minSalary: 50000, categories: ["travel", "points"] },
    { title: "บัตรเครดิต UOB Premier", summary: "บัตรระดับบน สิทธิ์เดินทางและสะสมคะแนนพิเศษ", minSalary: 30000, categories: ["travel", "points"] },
    { title: "บัตรเครดิต UOB Lady's Solitaire", summary: "บัตรผู้หญิงระดับบน สิทธิ์ท่องเที่ยวและร้านอาหาร", minSalary: 30000, categories: ["travel", "dining"] },
    { title: "บัตรเครดิต UOB Visa Infinite", summary: "บัตรพรีเมียมสูงสุด สิทธิ์เดินทางและบริการระดับโลก", minSalary: 100000, categories: ["travel", "points"] },
  ],
};
