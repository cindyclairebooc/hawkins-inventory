<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\PositionResource;
use App\Http\Requests\StorePositionRequest;
use App\Http\Requests\UpdatePositionRequest;
use App\Models\Position;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return PositionResource::collection(Position::query()->orderBy('id', 'asc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StorePositionRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePositionRequest $request)
    {
    $data = $request->validated();
    $position = Position::create($data);

    return response()->json(new PositionResource($position), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Position $position
     * @return \Illuminate\Http\Response
     */
    public function show(Position $position)
    {
    return response()->json(new PositionResource($position), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdatePositionRequest $request
     * @param \App\Models\Position $position
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePositionRequest $request, Position $position)
    {
    $data = $request->validated();
    $position->update($data);

    return response()->json(new PositionResource($position), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Position $position
     * @return \Illuminate\Http\Response
     */
    public function destroy(Position $position)
    {
        $position->delete();

        return response("", 204);
    }
}