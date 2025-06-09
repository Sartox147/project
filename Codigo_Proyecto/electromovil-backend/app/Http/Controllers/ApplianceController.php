<?php

namespace App\Http\Controllers;

use App\Models\Appliance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ApplianceController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return response()->json($user->appliances);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:lavadora,nevera',
            'brand' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'image' => 'nullable|image|max:2048', // Máx 2MB
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('appliance_images', 'public');
        }

        $appliance = Appliance::create([
            'user_id' => Auth::id(),
            'type' => $request->type,
            'brand' => $request->brand,
            'model' => $request->model,
            'purchase_date' => $request->purchase_date,
            'image' => $imagePath,
        ]);

        return response()->json($appliance, 201);
    }
    public function destroy($id)
    {
    $appliance = Appliance::where('id', $id)
        ->where('user_id', Auth::id())
        ->firstOrFail();

    $appliance->delete();

    return response()->json(['message' => 'Electrodoméstico eliminado'], 200);
    }
    public function update(Request $request, Appliance $appliance)
    {
    if ($appliance->user_id !== Auth::id()) {
        return response()->json(['error' => 'No autorizado'], 403);
    }

    $request->validate([
        'type' => 'sometimes|required|in:lavadora,nevera',
        'brand' => 'sometimes|nullable|string|max:255',
        'model' => 'sometimes|nullable|string|max:255',
        'purchaseDate' => 'sometimes|nullable|date',
        'image' => 'sometimes|nullable|string',
    ]);

    $appliance->update($request->only([
        'type', 'brand', 'model', 'purchaseDate', 'image'
    ]));

    return response()->json($appliance);
    }
    
}
