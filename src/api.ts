import { Router } from "./deps.ts";
import * as planets from "../models/planets.ts";
import * as launches from "../models/launches.ts";
import planetRepository from "./modules/planets/planet.repository.ts";
import launchRepository from "./modules/launches/launch.repository.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `
    {___     {__      {_         {__ __        {_       
    {_ {__   {__     {_ __     {__    {__     {_ __     
    {__ {__  {__    {_  {__     {__          {_  {__    
    {__  {__ {__   {__   {__      {__       {__   {__   
    {__   {_ {__  {______ {__        {__   {______ {__  
    {__    {_ __ {__       {__ {__    {__ {__       {__ 
    {__      {__{__         {__  {__ __  {__         {__
                    Mission Control API`;
});

router.get("/planets", async (ctx) => {
  ctx.response.body = await planetRepository.getAll();
});

router.get("/planets/:id", async (ctx) => {
  if (ctx.params?.id) {
    const launchesList = await planetRepository.getById(
      parseInt(ctx.params.id),
    ); //launches.getOne(Number(ctx.params.id));
    ctx.response.body = launchesList ?? ctx.throw(400, "Launch doesn't exist");
  }
});

router.get("/launches", async (ctx) => {
  ctx.response.body = await launchRepository.getAll(); //launches.getAll();
});

router.get("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const launchesList = launches.getOne(Number(ctx.params.id));
    ctx.response.body = launchesList ?? ctx.throw(400, "Launch doesn't exist");
  }
});

router.post("/launches", async (ctx) => {
  const body = await ctx.request.body().value;
  ctx.response.body = await launchRepository.create(body);
  ctx.response.status = 201;
});

router.delete("/launches/:id", async (ctx) => {
  if (ctx.params?.id) {
    // const result = await launchRepository.delete(parseInt(ctx.params.id)); //launches.removeOne(Number(ctx.params.id));
    const result = await launchRepository.update(parseInt(ctx.params.id));
    ctx.response.body = { success: result };
  }
});

export default router;
