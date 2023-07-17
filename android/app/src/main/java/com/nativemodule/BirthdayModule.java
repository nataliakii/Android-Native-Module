package com.nativemodule;

import android.database.Cursor;
import android.util.Log;
import android.net.Uri;
import android.provider.CalendarContract;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

public class BirthdayModule extends ReactContextBaseJavaModule {
    public BirthdayModule(ReactApplicationContext context) {
        super(context);
    }
    private static final String EVENT_TITLE = "Happy birthday!";

    @Override
    public String getName() {
        return "BirthdayModule";
    }

    @ReactMethod
    public void getDaysUntilBirthday(Promise promise)   {
        Calendar today = Calendar.getInstance();
        long startMillis = today.getTimeInMillis();
        today.add(Calendar.YEAR, 1);
        long endMillis = today.getTimeInMillis();
        Log.d("BDModule", "BD DATA : " + today + startMillis);

        String[] projection = {CalendarContract.Events.DTSTART};
        String selection = CalendarContract.Events.TITLE + " = ? AND " +
                CalendarContract.Events.DTSTART + " >= ? AND " +
                CalendarContract.Events.DTSTART + " < ?";
        String[] selectionArgs = {EVENT_TITLE, String.valueOf(startMillis), String.valueOf(endMillis)};
        String sortOrder = CalendarContract.Events.DTSTART + " ASC";

        Cursor cursor = getReactApplicationContext().getContentResolver().query(
                CalendarContract.Events.CONTENT_URI,
                projection,
                selection,
                selectionArgs,
                sortOrder
        );

        if (cursor != null && cursor.moveToFirst()) {
            int startDateIndex = cursor.getColumnIndex(CalendarContract.Events.DTSTART);

            long eventStartDate = cursor.getLong(startDateIndex);
            cursor.close();

            long daysLeft = calculateDaysLeft(eventStartDate);
            promise.resolve((int) daysLeft);
        } else {
            if (cursor != null) {
                cursor.close();
            }
            promise.reject("NO_EVENT", "No upcoming '" + EVENT_TITLE + "' event found");
        }
    }

    private long calculateDaysLeft(long eventStartDate) {
        long currentTime = System.currentTimeMillis();
        long timeDiff = eventStartDate - currentTime;
        return TimeUnit.MILLISECONDS.toDays(timeDiff);
    }
}
