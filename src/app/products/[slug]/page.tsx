import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { wheels } from "@/data/wheels";
import { ProductConfigurator } from "@/components/products/product-configurator";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const item=wheels.find(x=>x.slug===slug);
 return {title:item?item.style+" "+item.name+" "+item.finish:"Wheel details",description:item?item.style+" "+item.name+" wheel. Explore published finishes, lug configurations and sizes.":"Mayhem wheel details"};
}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const items=wheels.filter(x=>x.slug===slug);
 if(!items.length)notFound();
 return <ProductConfigurator items={items}/>;
}
