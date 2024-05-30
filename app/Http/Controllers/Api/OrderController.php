<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return OrderResource::collection(Order::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreOrderRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOrderRequest $request)
    {
    $data = $request->validated();
    $order = Order::create($data);

    return response()->json(new OrderResource($order), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
    return response()->json(new OrderResource($order), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateOrderRequest $request
     * @param \App\Models\Order                     $order
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
    $data = $request->validated();
    $order->update($data);

    return response()->json(new OrderResource($order), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return response("", 204);
    }
}