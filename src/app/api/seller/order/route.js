import connectToDatabase from "@/config/db";
import { NextResponse } from "next/server";
const db = connectToDatabase();

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const order_id = searchParams.get("order_id");
  const sql = `call Get_Order_Detail_Seller(${order_id})`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(NextResponse.json(result[0]));
    });
  });
}

export async function PUT(req) {
  const data = await req.json();
  const { Status, Expected_delivery_date, Shipping_company, Order_ID } = data;
  const sql = `UPDATE ORDER_TABLE SET Status = '${Status}', Expected_delivery_date = '${Expected_delivery_date}', Shipping_company = '${Shipping_company}' WHERE Order_id = ${Order_ID}`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(NextResponse.json(result));
    });
  });
}
