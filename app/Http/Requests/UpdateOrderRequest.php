<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer' => 'required|string|max:255',
            'product' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'status' => 'required|string|in:Pending,Completed,Cancelled',
        ];
    }
}