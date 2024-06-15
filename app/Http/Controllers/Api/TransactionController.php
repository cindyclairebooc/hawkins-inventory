<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransactionRequest;
use App\Models\Transaction;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Resources\TransactionResource;
use Illuminate\Http\Response;

class TransactionController extends Controller
{
    /**
      * Display a listing of the resource.
      */
     public function index()
     {
         return TransactionResource::collection(
            Transaction::query()->orderBy('id', 'asc')->paginate(10)
         );
     }
 
     /**
      * Store a newly created resource in storage.
      */
     public function store(StoreTransactionRequest $request)
     {
         $data = $request->validated();
         $item = Transaction::create($data);
         return (new TransactionResource($item))
             ->response()
             ->setStatusCode(Response::HTTP_CREATED);
     }
 
     /**
      * Display the specified resource.
      */
     public function show(Transaction $transaction)
     {
         return new TransactionResource($transaction);
     }
 
     /**
      * Update the specified resource in storage.
      */
     public function update(UpdateTransactionRequest $request, Transaction $transaction)
     {
         $data = $request->validated();
         $transaction->update($data);
 
         return response()->json(new TransactionResource($transaction), Response::HTTP_OK);
     }
 
     /**
      * Remove the specified resource from storage.
      */
     public function destroy(Transaction $transaction)
     {
         $transaction->delete();
 
         return response("", 204);
     }
 }