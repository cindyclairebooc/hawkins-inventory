<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePositionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'pos_name' => 'required|string|max:255',
            'pos_description' => 'required|string'
        ];
    }
}