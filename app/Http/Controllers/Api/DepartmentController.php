<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\DepartmentResource;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Models\Department;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return DepartmentResource::collection(Department::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreDepartmentRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDepartmentRequest $request)
    {
    $data = $request->validated();
    $department = Department::create($data);

    return response()->json(new DepartmentResource($department), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Department $department
     * @return \Illuminate\Http\Response
     */
    public function show(Department $department)
    {
    return response()->json(new DepartmentResource($department), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateDepartmentRequest $request
     * @param \App\Models\Department $department
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
    $data = $request->validated();
    $department->update($data);

    return response()->json(new DepartmentResource($department), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Department $department
     * @return \Illuminate\Http\Response
     */
    public function destroy(Department $department)
    {
        $department->delete();

        return response("", 204);
    }
}