<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'item_name' => 'sometimes|required|string|max:255',
            'manufactured_date' => 'sometimes|required|date',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            // 'category_id' => 'sometimes|required|exists:categories,category_id',
        ];
    }
}
